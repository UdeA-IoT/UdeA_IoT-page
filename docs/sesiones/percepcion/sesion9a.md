---
sidebar_label: 'Introducción'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

# Sesión 9 - Manejo de interrupciones

:::note[**Objetivos**]
* Comprender la diferencia entre polling, interrupciones e Hilos
* Aprender a desarrollar aplicaciones que involucren el uso de interrupciones
* 
:::

## Introducción

En construcción...

Para empezar retomemos el mapa de pines de la plataforma ESP32:

![pines_dev_kit_v4](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/_images/esp32-devkitC-v4-pinout.png)

## Super loop

En los programas realizados hasta el momento se ha seguido un patron de diseño conocido como **Super loop** (tambien conocido como **mega loop**, **main loop** o **infinite loop**). En este patron, la función principal (**main**) el cual esta compuesto de dos partes principales:
1. **Sección de inicializacion**: Esta parte del codigo realizada al principio es la encargada de realizar las tareas de inicialización del sistema (configuración de modulos, inicialización de variables globales, incialización de puertos, etc).
2. **Ciclo infinito**: En esta parte se implementa la logica del sistema como tal, ejecutando de manera repetiva las siguientes tres tareas de acuerto a los requerimientos del sistema:
   * Lectura de entradas.
   * Procesamiento de entradas o datos.
   * Control de salidas. 

El siguiente fragmento de código muestra el esquema tipico para este patrón:

```cpp
void main (void)
{
  // various initializations

  for(;;) // "super loop" or "main loop"
  {
    // do stuff
  }
}
```

:::tip
Para profundizar mas sobre el concepto de **super loop** puede consultar las siguientes paginas:
* **How To Write Super Loops In Firmware** [[link]](https://blog.mbedded.ninja/programming/design-patterns/how-to-write-super-loops-in-firmware/)
* **Basic concepts** [[link]](https://micro-os-plus.github.io/user-manual/basic-concepts/) (Parte de la documentación de [uOS++](https://micro-os-plus.github.io/))
* **What is a Real-Time Operating System (RTOS)?** [[link]](https://www.digikey.com/en/maker/projects/what-is-a-realtime-operating-system-rtos/28d8087f53844decafa5000d89608016)
:::

Como habrá visto a lo largo del curso se ha usado este patron para programar el Arduino y la ESP32. El siguiente es un ejemplo tipico en el cual se sigue este patron para poner a parpadear un led.

![led_blink](/img/sesiones/percepcion/9/led_blink.png)

El código del microcontrolador, se muestra a continuación:

```cpp
#define LED 19
int led_status;

void setup() {
  led_status = HIGH;
  pinMode(LED, OUTPUT);
}

void loop(){
  digitalWrite(LED, led_status);
  delay(500);
  led_status = !led_status;
}
```

> **Simulación**
> En el siguiente [[link]](https://wokwi.com/projects/387387332229824513) se puede simular el código anterior

Si se observa el ejemplo anterior, notará que no se estan haciendo uso de entradas externas de modo que ¿Que es lo que se suele hacer para que una aplicación interactue con entradas externas? 

Para responder a la pregunta anterior, haremos uso del concepto de **Polling** el cual sera tratado a continuación.

## Polling

Cuando un sistema usa entradas, es necesario evaluar su estado para que el programa responda de acuerto a los eventos que ocurren cuando estas cambian. El procedimiento de leer continuamente el valor de una entrada y consultar (sondear) si esta ha cambiado se conoce como **Polling**. La siguiente figura (tomada del siguiente [link](https://users.ece.utexas.edu/~valvano/Volume1/E-Book/C12_Interrupts.htm)) ilustra el concepto:

![polling](/img/sesiones/percepcion/9/polling.png)

El **polling** (**consulta**) puede ser realizado a toda alta velocidad dentro del loop (lo cual hace que el loop ocupe todos los frecursos del procesador) o tambien puede ser realizado a intervalos menos frecuentes y regulares. Para ilustrar esto, observemos el siguiente sistema en el cual se prende un led mientras se tiene un pulsador presionado. 

![button_polling](/img/sesiones/percepcion/9/button_polling.png)

El código que se ejecuta en el microcontrolador se muestra a continuación:

```cpp
const int buttonPin = 2;
const int ledPin = 22;  

int buttonState = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  buttonState = digitalRead(buttonPin);
  if (buttonState == HIGH) {
    digitalWrite(ledPin, HIGH);
  }
  else {
    digitalWrite(ledPin, LOW);
  }
  //delay(10); // this speeds up the simulation
}
```

> **Simulación**
> El código anteriormente mostrado se puede simular en el siguiente [[link]](https://wokwi.com/projects/387408382036143105)

En el ejemplo anterior, no hay ninguna tarea critica ya que la respuesta al evento de presionar el botón no tiene que ser inmediata; sin embargo, si se tuviera una situación en la cual se estuviera controlando un motor desde el microcontrolador y la función del botón consistiera en realizar una parada de emergencia, usar **polling** sería ineficiente y hasta peligroso ya que debido al caracter secuencial del esquema empleado, la respuesta al evento de presionar el botón no seria inmediata. 

A continuación, encontramos las ventajas y desventajas cuando se usa **polling**:

|Ventajas|Desventajas|
|---|---|
|<li> Facil de entender </li> <li> No hay problemas de concurrencia (thread safety)</li>|<li>A veces, hay problemas de complejidad cuando se utiliza el súper bucle implementa gran cantidad de código.</li><li> No es energeticamente eficiente</li><li> La respuesta a eventos criticos puede ser demorada, lo cual puede ser delicado sobre todo en aplicaciones de tiempo real </li>|

Para solucionar la limitación al responder a eventos criticos que se tienen con el **polling**, se hacen uso de las **interrupciones** tal y como se muestra en la siguiente figura (tomada del siguiente [link](https://www.digikey.com/en/maker/projects/what-is-a-realtime-operating-system-rtos/28d8087f53844decafa5000d89608016))


![super_loop_irq](/img/sesiones/percepcion/9/super_loop_irq.png)

Cuando se emplean interrupciones, si se produce un evento externo el flujo de ejecución del **super loop** se interrumpe inmediatamente para atender la interrupción, ejecutando el conjunto de instrucciones asociadas a esta de tal modo que una vez se ejecutan estas, el programa reanuda su ejecución el el punto del **super loop** donde fue interrumpida. La siguiente figura ilustra esto. 

![super_loop_irq](/img/sesiones/percepcion/9/interrupciones.png)

En la siguiente sección vamos a profundizar mas en el uso de interrupciones.

## Referencias

* https://www.mikroe.com/ebooks/microcontroladores-pic-programacion-en-c-con-ejemplos/caracteristicas-basicas-del-pic16f887
* https://www.theengineeringprojects.com/2021/12/esp32-interrupts.html
* https://espressif-docs.readthedocs-hosted.com/projects/arduino-esp32/en/latest/api/timer.html
* https://docs.espressif.com/projects/esp-idf/en/v4.3/esp32/api-reference/peripherals/timer.html
* https://espressif-docs.readthedocs-hosted.com/projects/arduino-esp32/en/latest/
* https://espressif-docs.readthedocs-hosted.com/projects/arduino-esp32/en/latest/api/timer.html
* https://deepbluembedded.com/esp32-timers-timer-interrupt-tutorial-arduino-ide/
* https://randomnerdtutorials.com/esp8266-nodemcu-big-timer-node-red/
* https://www.arduino.cc/reference/en/libraries/esp32timerinterrupt/
* https://github.com/khoih-prog/ESP32TimerInterrupt
* https://github.com/khoih-prog/ESP32TimerInterrupt/tree/master/examples/multiFileProject
* https://randomnerdtutorials.com/esp32-pir-motion-sensor-interrupts-timers/
* https://randomnerdtutorials.com/micropython-interrupts-esp32-esp8266/
* https://learn.sparkfun.com/tutorials/processor-interrupts-with-arduino/all
* https://github.com/sparkfun/processor_interrupt_examples
* https://learn.adafruit.com/cooperative-multitasking-in-circuitpython-with-asyncio/overview
* https://lastminuteengineers.com/handling-esp32-gpio-interrupts-tutorial/
* https://deepbluembedded.com/esp32-external-interrupts-pins-arduino-examples/
* https://www.sparkfun.com/news/2613
* https://www.sparkfun.com/news/2608
* https://www.sparkfun.com/news/2577
* https://programarfacil.com/blog/arduino-blog/interrupciones-con-arduino-ejemplo-practico/
* https://www.luisllamas.es/que-son-y-como-usar-interrupciones-en-arduino/
* https://descubrearduino.com/interrupciones-esp32-gpio/
* https://www.electrogeekshop.com/esp32-arduino-interrupciones-timer-2/
* https://www.arduino.cc/reference/en/language/functions/interrupts/interrupts/
* https://www.arduino.cc/reference/en/language/functions/external-interrupts/attachinterrupt/
* https://controlautomaticoeducacion.com/arduino/interrupciones-arduino/
* https://www.theengineeringprojects.com/2021/12/esp32-interrupts.html
* http://stefanfrings.de/multithreading_arduino/
* https://hackaday.com/2021/03/17/running-57-threads-at-once-on-the-arduino-uno/
* https://www.arduino.cc/reference/en/libraries/arduinothread/
* https://www.digikey.com/en/maker/blogs/2022/how-to-write-multi-threaded-arduino-programs
* https://github.com/ivanseidel/ArduinoThread
* https://learn.adafruit.com/cooperative-multitasking-in-circuitpython-with-asyncio/overview
* https://wiki.seeedstudio.com/Wio-Terminal-TinyML-EI-4/
* https://wiki.seeedstudio.com/reServer-Getting-Started/
* https://www.seeedstudio.com/blog/2021/05/11/multitasking-with-arduino-millis-rtos-more/
* https://www.hackster.io/485734/azure-rtos-threadx-for-arduino-101-threads-963a8d
* https://stackoverflow.com/questions/44429456/what-is-super-loop-in-embedded-c-programming-language
* https://www.youtube.com/playlist?list=PL4cGeWgaBTe155QQSQ72DksLIjBn5Jn2Z