---
sidebar_label: 'Ejemplo 1'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

# Ejemplo 1

## Antes de empezar

Antes de empezar (ToDo: Hablar un poco sobre las interrupciones)...

## Enunciado

Hacer una aplicación que cambie el estado de un led cada vez que se presiona un boton.

## Hardware

### Componentes

|#|Elemento|Cantidad|
|---|---|---|
|1|ESP32|1|
|2|Pulsador|1|
|3|Led|1|
|4|Resistencia de 10k|1|
|5|Resistencia de 220|1|

### Conexiones

![hw_e1](/img/sesiones/percepcion/9/interrupts/e1/hw_example1.png)

## Sofware

A continuación se muestran varias implementaciones en software que cumplen con los requisitos de la aplicación. La lista de implementaciones mostradas se muestra a continuación:
1. Implementación por **polling** usando la función ```delay()```.
2. Implementación usando polling + millis.
3. Implementación usando interrupciones: Problema del debounce.
4. Implementación usando interrupciones con antidebunce.

## Implementación por polling usando la función ```delay()```

A continuación se muestra la implementación por polling usando la función ```delay()```. Para determinar el flanco de subida al precionar el boton se hacen dos lecturas del botón (siguendo la forma: lectura 1 + delay + lectura 2) y se comparan los valores capturados en estas de tal manera que si ambos son diferentes y el valor de la ultima lectura es ```HIGH``` se produce un flanco de subida cambiando el estado del led. El algoritmo se resume a continuación:

```cpp
#define SERIAL_SPEED 9600

const int buttonPin = 12;
const int ledPin = 25;  

int buttonState, prev_buttonState;
int ledState;

unsigned long last_DebounceTime = 0;
unsigned long debounce_delay = 10;

void setup() {
  // Configuracion de puertos
  pinMode(ledPin, OUTPUT);
  Serial.begin(SERIAL_SPEED);
  // Inicializacion de variables
  buttonState = 0;
  ledState = LOW;
  digitalWrite(ledPin, ledState);
  prev_buttonState = buttonState;
  // Iniciacion del puerto serial  
  Serial.println("Inicio...");
}

void loop() {
  buttonState = digitalRead(buttonPin);
  delay(debounce_delay);
  if (buttonState != prev_buttonState) {
    // Transición (positiva o negativa)
    // Serial.println("[T]");
    if (buttonState == HIGH) {
      // Transición positiva
      Serial.print("[T+]-> Led:");
      Serial.println(ledState);
      ledState = !ledState;
      digitalWrite(ledPin, ledState);
    }
  }
  prev_buttonState = buttonState;
}
```

> **Simulación online**
> 
> En el siguiente [link](https://wokwi.com/projects/387861640702724097) puede simular el código para comprender su funcionamiento.

:::important
Aunque el código anterior hace lo que se pide, este no es tan eficiente debido al retardo producido por la función ```delay()``` entre las dos lecturas. Como la aplicación solo lee un botón no hay problema, pero si por ejemplo, ademas de leer el valor de un botón se estuviera monitoreando una entrada asociada a una alarma, la respuesta de la alarma se retrazaria como minimo por el retardo debido al ```delay()``` lo cual haria que el sistema fuera impractico para un caso real donde una señal de estas caracteristicas debe ser atendida lo mas pronto posible.
:::

### Implementación por polling usando la función ```millis()```

A continuación se muestra la implementación haciendo uso de la función ```millis()```. 

```cpp
#define SERIAL_SPEED 9600

const int buttonPin = 12;
const int ledPin = 25;  

int buttonState, prev_buttonState;
int ledState;
int reading;

unsigned long last_DebounceTime = 0;
unsigned long debounce_delay = 50;

void setup() {
  // Configuracion de puertos
  pinMode(ledPin, OUTPUT);
  Serial.begin(SERIAL_SPEED);
  // Inicializacion de variables
  buttonState = 0;
  ledState = LOW;
  digitalWrite(ledPin, ledState);
  prev_buttonState = buttonState;
  // Iniciacion del puerto serial  
  Serial.println("Inicio...");
}

void loop() {
  reading = digitalRead(buttonPin);
  // Verificacion si el boton no se ha estabilizado (hay rebote)
  if (reading != prev_buttonState) {
    // Reset del timer asociado al rebote
    last_DebounceTime = millis();
  }
  // Verificacion si el boton se estabilizo
  if ((millis() - last_DebounceTime) > debounce_delay) {    
    // Se verifica se el boton cambio de valor
    if (reading != buttonState) {      
      buttonState = reading;   
      Serial.println("[T]");
      // Se verifica si el cambio obedece a un flanco positivo
      if (buttonState == HIGH) {     
        // Cambio del led
        Serial.print("[T+]-> Led:");
        Serial.println(ledState);
        ledState = !ledState;
        digitalWrite(ledPin, ledState);
      }
    }
  }
  prev_buttonState = reading;
}
```

> **Simulación online**
> 
> En el siguiente [link](https://wokwi.com/projects/387939900260779009) puede simular el código para comprender su funcionamiento.

:::important
Este código soluciona el problema del retardo asociado al caso anterior, sin embargo como se puede notar, la logica se vuelve más compleja.
:::

### Codigo interrupciones con problemas de rebote

A continuación se muestra el código usando interrupciones. Este código pese tiene problemas al manejar el rebote del boton.

```cpp
#define SERIAL_SPEED 9600

const int buttonPin = 12;
const int ledPin = 25;  

int ledState;
volatile bool led_change;

void IRAM_ATTR button_ISR() {
  led_change = true;
}

void setup() {
  // Configuracion de puertos
  pinMode(ledPin, OUTPUT);
  Serial.begin(SERIAL_SPEED);
  // Inicializacion de variables
  led_change = false;
  ledState = LOW;
  digitalWrite(ledPin, ledState);
  attachInterrupt(digitalPinToInterrupt(buttonPin), button_ISR, RISING);
  // Iniciacion del puerto serial  
  Serial.println("Inicio...");
}

void loop() {
  if (led_change == true) {
    // Transición positiva
    Serial.print("[T+]-> Led:");
    Serial.println(ledState);
    ledState = !ledState;
    digitalWrite(ledPin, ledState);
    led_change = false;
  }
}
```

> **Simulación online**
> 
> En el siguiente [link](https://wokwi.com/projects/387862205667175425) puede simular el código para comprender su funcionamiento.

Para entender el efecto del rebote en el programa, mire el siguiente código:
1. Simule el código haciendo que el botón no tenga rebote (botón ideal). Tenga en cuenta la siguiente figura para esto:
   
   ![hw_e1](/img/sesiones/percepcion/9/interrupts/e1/irq_ideal_button.png)

2. Simule el código haciendo que el botón tenga rebote (bóton real). La siguiente figura ilustra esto:
   
   ![hw_e1](/img/sesiones/percepcion/9/interrupts/e1/irq_real_button.png)

## Codigo interrupciones con el problema solucionado

No es el mejor código, pero funciona.

```cpp
#define SERIAL_SPEED 9600

const int buttonPin = 12;
const int ledPin = 25;  

int ledState;

volatile bool led_change;

unsigned long last_DebounceTime = 0;
unsigned long debounce_delay = 70; // Probar con varios valores 
                                   // hasta que funcione (10, 20,...)


void IRAM_ATTR button_ISR() {
  if(millis() - last_DebounceTime > debounce_delay){ 
    // Software debouncing buton
    // ets_printf("ISR triggered\n");
    led_change = true;
 }
 last_DebounceTime = millis();
}

void setup() {
  // Configuracion de puertos
  pinMode(ledPin, OUTPUT);
  Serial.begin(SERIAL_SPEED);
  // Inicializacion de variables
  led_change = false;
  ledState = LOW;
  digitalWrite(ledPin, ledState);
  attachInterrupt(digitalPinToInterrupt(buttonPin), button_ISR, RISING);
  // Iniciacion del puerto serial  
  Serial.println("Inicio...");
}

void loop() {
  if (led_change == true) {
    // Transición positiva
    Serial.print("[T+]-> Led:");
    Serial.println(ledState);
    ledState = !ledState;
    digitalWrite(ledPin, ledState);
    led_change = false;
  }
}
```

> **Simulación online**
> 
> En el siguiente [link](https://wokwi.com/projects/387864147969036289) puede simular el código para comprender su funcionamiento.
> 
> ![e1_ok](/img/sesiones/percepcion/9/interrupts/e1/irq_real_button-ok.png)



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

