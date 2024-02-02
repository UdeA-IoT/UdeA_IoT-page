---
sidebar_label: 'Ejemplo 2'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

# Ejemplo 2

## Antes de empezar

Antes de empezar (ToDo: referenciar la parte de)...

## Enunciado

Aunque en el ejemplo 1 ya se contextualizó el problema del rebote, el siguient ejemplo de refuerzo busca complementar lo previamente aprendido. El hardware empleado es el mismo, pero el software muestra el efecto cuando no se trata y cuando se trata el rebote cuando se usan interrupciones externas al programar.

Para visualizar el efecto debido al rebote (en ambos casos), se hace uso del monitor serial mediante la impresion de mensajes de debug.

## Hardware

### Componentes

|#|Elemento|Cantidad|
|---|---|---|
|1|Placa de desarrollo ESP32|1|
|2|KY-004 Button (37 sensor Kid - Ladzo o Elegoo)|1|

### Esquemático

A continuación se muestra esquematico del circuito:

![sch_e2](/img/sesiones/percepcion/9/interrupts/e2/button_irq-ESP32_sch.png)

### Conexion

A continuación se muestra el diagrama de conexión:

![bb_e2](/img/sesiones/percepcion/9/interrupts/e2/button_irq-ESP32_bb.png)

## Sofware

A continuación se muestran varias implementaciones en software que cumplen con los requisitos de la aplicación. La lista de implementaciones mostradas se muestra a continuación:
1. **Caso 1 - Problema con los rebotes**: En este caso, el problema de los rebotes no es tratado por lo que el funcionamiento del programa es erratico
2. **Caso 2 - Solución del problema con los rebotes**: En este caso, el problema de los rebotes es tratado haciendo que el programa tenga un comportamiento predecible tal y como se desea.

## Caso 1 - Problema con los rebotes

En esta implementación, se tiene un problema con los rebotes. Para ver este problema analice primero la **simulación** [[link](https://wokwi.com/projects/376220446820566017)]

### Código

```cpp
#include <Arduino.h>

int ledPin = LED_BUILTIN;  // LED is attached to digital pin 2
int x = 0;                 // variable to be updated by the interrupt
int buttonPin = 4;         // buttton is attached to digital pin 4

// Interrupt service routine for interrupt 0
void increment() {
  x++;
  digitalWrite(ledPin, HIGH);
}

// Setup
void setup() {
  //enable interrupt 0 (pin 2) which is connected to a button
  //jump to the increment function on rising edge
  pinMode(ledPin, OUTPUT);
  attachInterrupt(digitalPinToInterrupt(buttonPin), increment, RISING);
  Serial.begin(9600);  //turn on serial communication
}

// loop
void loop() {
  digitalWrite(ledPin, LOW);
  delay(3000); //pretend to be doing something useful
  Serial.println(x, DEC); //print x to serial monitor
}
```

### Test

La salida en el monitor serial del platformio muestra el resultado. Note que los valores de la variable impresa no siguen un patron predecible.

![serial_sw1](/img/sesiones/percepcion/9/interrupts/e2/no_debounce-ESP32.png)

## Caso 2 - Solución del problema con los rebotes

En este caso, por medio de la implementación de un retardo, se soluciona el problema del rebote del interruptor. La siguiente **simulación** ([link](https://wokwi.com/projects/376222724903465985)) muestra la forma en que esto se hace.

### Código

```cpp
#include <Arduino.h>

const int DEBOUNCE_DELAY = 300; // debounce delay 
int ledPin = LED_BUILTIN;  // LED is attached to digital pin 2
int x = 0;                 // variable to be updated by the interrupt
int buttonPin = 4;         // buttton is attached to digital pin 4

//variables to keep track of the timing of recent interrupts
unsigned long button_time = 0;  
unsigned long last_button_time = 0; 

// declaration ISR
void increment(); 

void setup() {
  //enable interrupt 0 (pin 2) which is connected to a button
  //jump to the increment function on rising edge
  pinMode(ledPin, OUTPUT);
  attachInterrupt(digitalPinToInterrupt(buttonPin), increment, RISING);
  Serial.begin(9600);  //turn on serial communication
}

void loop() {
  digitalWrite(ledPin, LOW);
  delay(3000); //pretend to be doing something useful
  Serial.println(x, DEC); //print x to serial monitor
}

// Interrupt service routine for interrupt 0
void increment() {
  button_time = millis();
  //check to see if increment() was called in the last 250 milliseconds
  if (button_time - last_button_time > DEBOUNCE_DELAY) {
    x++;
    digitalWrite(ledPin, HIGH);
    last_button_time = button_time;
  }
}
```

### Test

La salida en el monitor serial del platformio muestra el resultado.

![serial_sw2](/img/sesiones/percepcion/9/interrupts/e2/debounce-ESP32.png)

## Referencias

* https://learn.sparkfun.com/tutorials/processor-interrupts-with-arduino/all
* https://programarfacil.com/blog/arduino-blog/interrupciones-con-arduino-ejemplo-practico/
* https://www.luisllamas.es/que-son-y-como-usar-interrupciones-en-arduino/
* https://randomnerdtutorials.com/esp32-pir-motion-sensor-interrupts-timers/
* https://www.cpe.ku.ac.th/~cpj/219335/slides/05-concurrency.pdf
* https://randomnerdtutorials.com/esp32-dual-core-arduino-ide/
* https://learn.sparkfun.com/tutorials/processor-interrupts-with-arduino/all
