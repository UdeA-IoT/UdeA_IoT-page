---
sidebar_label: 'Introducción'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

# Interrupciones externas

:::note[**Objetivos**]
* En construcción....
:::

## Configuración de una interrupción


Como se habia explicado previamente, cuando ocurre un evento o interrupción, el procesador se da cuenta de inmediato, guarda su estado de ejecución, ejecuta una pequeña porción de código (**interrupt handler** o **interrupt service routine**) y luego regresa a lo que estaba haciendo antes.

El programador es quien define el codigo que será ejecutado cuando una interrupción particular ocurre dentro del progama. Para configurar una interrupción usando el API de Arduino se usa la función ```adjuntaInterrupt()``` cuya sintaxis se muestra a continuación:

```cpp
attachInterrupt(digitalPinToInterrupt(GPIO), funcion, mode);
```

Esta función toma los siguientes tres parametros:
* **```digitalPinToInterrupt(pin)```**: Numero del pin de la interrupción. Esta función le indica al microprocesador el pin que se va a monitorear. Los pines susceptibles de generar interrupciones varían en función del modelo de board empleada. La siguiente tabla muestra algunos casos:

  |Board|INT0|INT1|INT2|INT3|INT4|INT5|
  |---|---|---|---|---|---|---|
  |UNO,	Nano, Ethernet, Mini Pro|Pin 2 |Pin 3|||||
  |Mega|	Pin 2	| Pin 3	|Pin 21|Pin 20|Pin	19|Pin 	18|
  |Leonardo|Pin 3	|Pin 2|Pin 0	|Pin 1|Pin 	7||
  
  Modelos como la Arduino DUE y la arduino UNO Wifi, tienen interrupciones asociadas a todos los pines. En lo que respecta al  ESP32, se pueden usar todos los pines GPIO para interruciones externas excepto los pines GPIO6, GPIO7, GPIO8, GPIO9, GPIO10 y GPIO11 ([link](https://microcontrollerslab.com/esp32-external-interrupts-tutorial-arduino-ide/)).  

  :::warning
  Para obtener información detallada sobre la asignación de pines y la configuración de interrupciones externas se debe tener en tener claridad a cerca de la placa y el framework empleandos (por ejemplo Arduino, ESP-IDF) empleados. 
  ::: 
      	
* **```ISR```**: Localización del codigo (interrupt service routine) que se ejecutará si la interrupción es lanzada. 
* **```mode```**: Define el tipo de evento que desencadenara la interrupción. Los posibles valores son:
  * **```LOW```**: Indica la activación de la interrupción cuando el pin este en BAJO.
  * **```HIGH```**: Activa la interrupción siempre que el pin este en ALTO.
  * **```CHANGE```**: Activa la interrupción cuando el pin cambia de valor (ya sea de ALTO a BAJO o viceversa).
  * **```FALLING```**: Activa la interrucción por flanco de caida (El pin pasa de ALTO a BAJO).
  * **```RISING```**:  Activa la interrucción por flanco de subida (El pin pasa de BAJO a ALTO).
  
  ![pin_state](/img/sesiones/percepcion/9/interrupts/pin_state.png))

:::tip
Para mas información sobre la función ```attachInterrupt()``` del API de arduino consulte las siguientes paginas:
* Documentación del Arduino ([link](https://www.arduino.cc/reference/en/language/functions/external-interrupts/attachinterrupt/))
* Documentación del ESP32 ([link](https://espressif-docs.readthedocs-hosted.com/projects/arduino-esp32/en/latest/api/gpio.html#interrupts))
:::

### Interrupciones externas en el ESP32

A continuación se describen los pasos para configurar una interrupción externa cuando se usa el ESP32 cuando se usa el framework de Arduino. 
1. **Asignar un pin para detectar la interrupción esterna**: Inicialmente se busca en la documentación que el pin pueda ser ligado a una interrupción externa. Luego, se configura la interrupción usando la función ```attachInterrupt()``` dentro la función ```setup()``` . Recuerde la sintaxis:
   

   ```cpp
   attachInterrupt(digitalPinToInterrupt(GPIOPin), function_ISR, Mode);
   ```
   
2. **Definir la ISR**: A continuación se muestra la sintaxis:
   

   ```cpp
   void IRAM_ATTR function_ISR() {
     // Instrucciones...
   }
   ```

   :::tip
   Para la definición de la ISR se recominda agregar la flag ```IRAM_ATTR``` para que el codigo de la función se almacene en la RAM (y no en la Flash) de modo que su ejecución sea mas rapida.
   :::
   
Por ejemplo, si se deseara configura una interrupción externa a traves del pin 23, el fragmento de código que resume el proceso descrito anterioremente tendra la siguiente forma:

```cpp
const int input_pin = 23;

void IRAM_ATTR function_ISR() {
  // Instrucciones...

}

void setup() {
  Serial.begin(115200);
  pinMode(input_pin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(input_pin), function_ISR, FALLING);
}

void loop() {
  // Logica de la aplicacion
}
```

## Referencias

* https://www.theengineeringprojects.com/2021/12/esp32-interrupts.html
* https://www.upesy.com/blogs/tutorials/what-are-interrupts-in-esp32-with-examples-for-arduino-code
* https://deepbluembedded.com/esp32-external-interrupts-pins-arduino-examples/#google_vignette
* https://programarfacil.com/blog/arduino-blog/interrupciones-con-arduino-ejemplo-practico/
* https://www.luisllamas.es/que-son-y-como-usar-interrupciones-en-arduino/
* https://docs.espressif.com/projects/esp-idf/en/v4.3/esp32/api-reference/peripherals/timer.html
* https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf
* https://www.espressif.com/sites/default/files/documentation/esp32_technical_reference_manual_en.pdf#iomuxgpio
* https://docs.ai-thinker.com/_media/esp32/docs/nodemcu-32s_product_specification.pdf
* https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/index.html
* https://www.upesy.com/blogs/tutorials/what-are-interrupts-in-esp32-with-examples-for-arduino-code
* https://esphome.io/devices/nodemcu_esp32.html
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
* https://wiki.seeedstudio.com/reTerminal-build-UI-using-LVGL/
* https://www.rt-thread.io/
* https://www.digikey.com/en/maker/tutorials/2022/how-to-use-arduino-interrupts-to-detect-user-inputs

