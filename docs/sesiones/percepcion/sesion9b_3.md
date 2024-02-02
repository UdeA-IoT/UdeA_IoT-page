---
sidebar_label: 'Interrupciones por timer'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

# Interrupciones por timer

:::note[**Objetivos**]
* En construcción....
:::

## Introducción


## Apuntes

### Apuntes 1

* With interrupts you don’t need to constantly check the current value of a pin. With interrupts, when a change is detected, an event is triggered (a function is called).
* To set an interrupt in the Arduino IDE, you use the attachInterrupt() function, that accepts as arguments: the GPIO pin, the name of the function to be executed, and mode:
  

  ```cpp
  attachInterrupt(digitalPinToInterrupt(GPIO), funcion, mode);
  ```
  
  * GPIO Interrupt: The first argument is a GPIO number. Normally, you should use digitalPinToInterrupt(GPIO) to set the actual GPIO as an interrupt pin.
  * Function to be triggered: function is the name of the function that will be called every time the interrupt is triggered.
  * Mode:
    * There are 5 different modes:
      * LOW: to trigger the interrupt whenever the pin is LOW;
      * HIGH: to trigger the interrupt whenever the pin is HIGH;
      * CHANGE: to trigger the interrupt whenever the pin changes value - for example from HIGH to LOW or LOW to HIGH;
      * FALLING: for when the pin goes from HIGH to LOW.
      * RISING: to trigger when the pin goes from LOW to HIGH;




### Apuntes 2

* Hardware interrupts allow your programs to respond to events more efficiently and dynamically.
* Hardware interrupts enable the AVR microcontroller to react to a change of state at a digital input pin at any time. In a way, they allow your AVR to multitask: when a button is pressed or when a signal is received at a digital input, the AVR will stop what it is doing and run some other code, called an interrupt service routine (ISR). After the ISR code runs, the AVR picks up execution where it left off before the interrupt.
* This chapter covers two kinds of hardware interrupts, 
  * external interrupts 
  * pin-change interrupts

### Apuntes 3 

> **URL**: https://www.theengineeringprojects.com/2021/12/esp32-interrupts.html

* Polling:
  * Polling is a process that performs continuous monitoring. Basically, the processor continuously monitors the state of a specific device or a peripheral, and when the status of the device satisfies the condition, the device executes the task that was required. Then it moves on to the next device to monitor until each one has been served. The processor performs no other operations and devotes all of its processing time to monitoring, and all other tasks are suspended until the current one is completed.
  * So, to overcome the disadvantage of the polling method, we chose the Interrupt method.
* Interrups
  * ESP32 module has a dual-core processor and each core consists of 32 interrupts. Basically interrupts are of two types:
    * Software interrupts: Software interrupts are internal which occur in response to the execution of a software instruction. For example, a timer can be used to generate a software interrupt.   
    * Hardware interrupts: Hardware interrupts are the external interrupts that are caused by an external event. For example, an external push button connected to ESP32’s GPIO or a motion sensor will generate an interrupt (event) if a motion is detected.
  * ISR (Interrupt Service Routine): 
    * When an interrupt occurs during normal program execution, an ISR (interrupt service routine) or an interrupt handler is called into action. The normal program execution will be halted, and the interrupt will be executed based on the priority level of the interrupt. 
    * Every interrupt has a fixed memory location where the address of the ISR is stored.
    * Interrupt Vector Table refers to a memory table or memory table that is used to store the location of an interrupt service routine.

### Apuntes 4

* https://espressif-docs.readthedocs-hosted.com/projects/arduino-esp32/en/latest/api/gpio.html
* https://espressif-docs.readthedocs-hosted.com/projects/arduino-esp32/en/latest/api/timer.html

### Apuntes 5 (Sparkfun)

> Ver tutorial https://learn.sparkfun.com/tutorials/processor-interrupts-with-arduino
* https://www.sparkfun.com/news/2608
* Tipos de Interrupciones.
* Como definr una rutina: 
  * https://www.arduino.cc/reference/en/language/functions/external-interrupts/attachinterrupt/
  * https://playground.arduino.cc/Main/PinChangeInt/
  * Ejemplo sencillo...
  * De los videos de aqui se puede sacar la grafica donde se explica la diferencia entre Polling y Interrupcion. 


### Apuntes 6 (Random Nerds tutorials)

* https://randomnerdtutorials.com/esp32-pir-motion-sensor-interrupts-timers/
* https://randomnerdtutorials.com/micropython-interrupts-esp32-esp8266/

### Apuntes 7

* https://learn.adafruit.com/cooperative-multitasking-in-circuitpython-with-asyncio/handling-interrupts

Ideas
* Microcontrollers provide a hardware mechanism called *interrupts* for handling asynchronous events. 
* A *hardware interrupt* can be generated when a pin changes state, when an internal timer triggers, when some hardware operation has completed, such as an I2C read or write, or for numerous other reasons.
* These events are usually asynchronous to the program being run, though sometimes interrupts are used to indicate that the program has caused an error, such as accessing a non-existent memory address.
* When an interrupt occurs, the interrupt mechanism will call a routine called an interrupt handler. The currently running program is temporarily suspended and other interrupts of lower priority are blocked. The interrupt handler routine does something quickly and returns, and then the regular program (usually) resumes. 
* Poner ejemplo de uso: For example, a pin connected to an external sensor may change, indicating that the sensor has new...
* The actual hardware interrupt is often called a hard interrupt, because it's generated and handled by the hardware. Acting on that interrupt later in an asynchronous fashion via software is often called handling a soft interrupt.

Polling:
* The alternative to interrupts is polling. When you check something over and over, waiting for a change, you are polling. For instance, you can monitor a DigitalInOut.value over and over in a loop. In the examples in this guide, you'll see a number of cases where some code checks for a condition, and then does an asyncio.sleep(). The code is polling, but in a controlled way, so that it doesn't block other code from running.

### Apuntes 7

> **URL**: https://lastminuteengineers.com/handling-esp32-gpio-interrupts-tutorial/#google_vignette

* https://deepbluembedded.com/esp32-external-interrupts-pins-arduino-examples/#google_vignette
* https://programarfacil.com/blog/arduino-blog/interrupciones-con-arduino-ejemplo-practico/
* https://www.luisllamas.es/que-son-y-como-usar-interrupciones-en-arduino/

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