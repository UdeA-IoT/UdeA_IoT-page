---
sidebar_label: 'Introducción'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

# Interrupciones

:::note[**Objetivos**]
* En construcción....
:::

## Introducción

Como se mostro anteriormente, el uso de **polling** tiene sus limitaciones sobre todo en lo que respecta en dar respuestas rapidas a eventos criticos. Para solucionar este problema se hacen uso de las **interruciones**.

Cuando se trabaja con interrupciones, el esquema del **super loop** se conserva; sin embargo, a diferencia del **polling**, el flujo de ejecución en el ciclo infinito este puede ser **interrumpido**. 

![super_loop_irq](/img/sesiones/percepcion/9/interrupts/super_loop_irq.png)

A continuación, se entratan a tratar estas con mas detalle y se explicará como usarlas haciendo uso del API de Arduino.

## Interrupciones

Las **interrupciones** son un tipo de *mecanismo* de hardware para manejar *eventos asincronos* (evento que no se sabe cuando sucederá). 

Cuando ocurre una interrupción, el mecanismo de interrupción invocará a una rutina llamada manejador de interrupciones (**interrupt handler** tambien conocido como **ISR: Interrupt Service Routine**) suspendiendo temporalmente el programa que esta siendo ejecutado y pasando a ejecutar las instruccióne definidas en el **ISR**. Cuando las instrucciones son ejecutadas, el programa se reanuda (generalmente) en el punto en el cual fue interrupido. La siguiente figura (tomada del siguiente [link](https://www.rt-thread.io/document/site/programming-manual/interrupt/interrupt/)) describe el proceso anterior:

![interrupt_work](/img/sesiones/percepcion/9/interrupts/interrupt_work.png)

Existen dos tipos de interrupciones:
* **Interrupciones por software**:  Estas son generadas por alguna condición que se produce como resultado de la ejecución de una instrucción. Una división por cero o una interrupción por timer son dos casos tipicos.
* **Interrupciones por hardware**: Estas ocurren como respuesta a eventos externos como el cambio en el estado de un pin, o la recepción de un paquete en un proceso de comunicación.

## Sobre las rutinas de servicio a interrupción (ISR - Interrupt service routine)

Las **ISR** (o **interrupt handler**) son las funciones que son lanzadas cuando un evento se produce. Como cualquier función, estas contienen un conjunto de instrucciones que son ejecutadas; sin embargo, al escribirlas es importante tener en cuenta los siguientes aspectos:
* Como las interrupciones estan pensadas en dar respuesta rapida a eventos, una estrategia comun al codificar ISR consiste en mantenerlas lo mas cortas posible. Es necesario evitar procesos (calculos coplejos, comunicación, etc.) que tomen mucho tiempo dentro de las ISR. Solo ISR largas son necesarias si esta consideranto permitir interrupciones anidadas.
* Comunmente, la función de la ISR se limita a activar una bandera, incrementar un contador, o modificar una variable. El objetivo de cualquiera de las operaciones previamente descritas consite en cambiar el flujo de ejecución dentro del ciclo infinito.
* Para poder modificar una variable externa dentro de una interrupción, al momento de hacer la declaración, esta debe tener el modificador **```volatile```**. Este modificador indica al compilador que la variable tiene que se consultada antes de ser usada debido a que puede haber sido modificada de forma ajena al flujo de ejecución normal del programa. A continuacón se muestra la sintaxis:

  ```cpp
  volatile tipo nombre_vatiable [= valor_inicial];
  ```  

:::warning
Dentro de una interrupción no se puede usar funciones como ```delay()``` o ```Serial.println```. Sin embargo, es posible desplegar mensajes en el monitor serial al usar la función (la cual es compatible con interrupciones) ```ets_printf()```
:::

## Referencias

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
* https://wiki.seeedstudio.com/reTerminal-build-UI-using-LVGL/
* https://www.rt-thread.io/
* https://redirect.cs.umbc.edu/~tinoosh/cmpe311/notes/Interrupts.pdf