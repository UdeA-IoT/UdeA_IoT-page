---
sidebar_label: 'Ejemplo 2'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

# Ejemplo 2

La siguiente aplicación muestra un ejemplo en el que se usa la comunicación serial para realizar un debug de una aplicación imprimiendo mensajes enviados desde el ESP32 con el fin de hacer una prueba de escritorio que determine que el funcionamiento de la aplicación es coherente con lo que se espera.

## Requerimientos

Desarrollar un sistema que permita modificar el color de un led RGB cada vez que se presiona un pulsador. Los estados entre los que cambiara el led RGB cada vez que se presione el pulsador son: rojo, verde, azul y apagado.

## Hardware

Los componentes necesarios para el circuito son

|Elemento|Descripcion|Observacione
|--|--|--|
|1|Placa de desarrollo ESP32||
|2|Pulsador|En este caso se uso el modulo **Reed Switch Module** del **37 Sensor Kit - Elegoo**|
|3|Led RGB|Se uso el modulo **RGB LED Module** del **37 Sensor Kit - Elegoo**|

A continuación se muestra el esquematico del circuito a montar:

<Image img={require('/img/sesiones/percepcion/4/ejemplo2/demo_esp_sch.png')} />

La siguiente tabla muestra las conexiones entre la placa ESP32 y los modulos externos (led y switch):

|Puerto|Pin|Tipo|Nombre|Descripción|
|---|---|---|---|---|
|```31```|```GPIO19```|Output|```PIN_BLUE```|Puerto que se conecta al pin **B** (azul) del modulo del led RGB|
|```30```|```GPIO18```|Output|```PIN_GREEN```|Puerto que se conecta al pin **G** (verde) del modulo del led RGB|
|```29```|```GPIO5```|Output|```PIN_RED```|Puerto que se conecta al pin **R** (red) del modulo del led RGB|
|```28```|```GPIO17```|Input|```PIN_BUTTON```|Puerto de control que se conecta pin **S** del modulo **switch**|

El diagrama de conexión asociado al esquematico anterior, se muestra a continuación:

<Image img={require('/img/sesiones/percepcion/4/ejemplo2/demo_esp_bb.png')} />

## Software

El programa ([simulación online](https://wokwi.com/projects/375183687075033089)) que recoge lo que se pide se muestra a continuación.

```cpp
#include <Arduino.h>

/* Constantes */

// Para debug
#define DEBUG 1

// Estados 
#define OFF_STATE 0
#define RED_STATE 1
#define GREEN_STATE 2
#define BLUE_STATE 3

// Comunicacion serial
const int baud_rate = 9600;

// Para el programa
const int DEBOUNCE_WINDOW = 40; // in ms

/* Entradas y salidas */

// Entradas
const int PIN_BUTTON = 17;

// Salidas
#define PIN_RED 5      // P5 (GPIO5)
#define PIN_GREEN 18   // P18 (GPI18)
#define PIN_BLUE 19     // P19 (GPI19)

/* Variables*/
int state;          // Estado
int button_val_prev;  // Valor del boton anterior
int button_val_act;  // Valor del boton anterior

/* Funciones */

void put_color(int, int, int);

void setup() {  
  pinMode(PIN_BUTTON, INPUT);  
  state = OFF_STATE;
  button_val_act = LOW; // Valor inicial del boton
  put_color(0, 0, 0);   // Led inicia apagado
  Serial.begin(baud_rate);   
  Serial.println("Dispositivo iniciado: OK");
  Serial.println("Led -> Apagado");
  #ifdef DEBUG   
    Serial.print("Estado actual: ");
    Serial.println(state);
  #endif
}

void loop() {
  // Lectura inicial del boton  
  button_val_act = digitalRead(PIN_BUTTON); // Se lee el boton
  
  // Ventan de tiempo para el debounce
  delay(DEBOUNCE_WINDOW);                   
  
  // Lectura despues de que pasa el rebote del boton 
  button_val_prev = button_val_act;         // Se almacena el valor previo del boton
  button_val_act = digitalRead(PIN_BUTTON); // Se vuelve a leer el boton

  // Comparacion de los valores previo y actual del boton
  if (button_val_act != button_val_prev) {
    // Se pulso el boton
    if(button_val_act == HIGH) {
      // Se verifica que el boton haya cambiado de LOW a HIGH
      // Maquina de estados
      switch (state) {
      case OFF_STATE:            
        state = RED_STATE;    // Proximo estado -> Rojo
        put_color(255, 0, 0); // Led se pone en rojo
        Serial.println("Led -> Rojo");
        #ifdef DEBUG          
          Serial.print("Estado : ");
          Serial.println(state);
        #endif
        break;
      case RED_STATE:            
        state = GREEN_STATE;  // Proximo estado -> Verde
        put_color(0, 255, 0); // Led se pone en verde
        Serial.println("Led -> Verde");
        #ifdef DEBUG          
          Serial.print("Estado : ");
          Serial.println(state);
        #endif
        break;
      case GREEN_STATE:            
        state = BLUE_STATE;   // Proximo estado -> Azul
        put_color(0, 0, 255); // Led se pone en azul
        Serial.println("Led -> Azul");
        #ifdef DEBUG          
          Serial.print("Estado : ");
          Serial.println(state);
        #endif
        break;
      case BLUE_STATE:            
        state = OFF_STATE;   // Proximo estado -> Apagado
        put_color(0, 0, 0); // Led se apaga
        Serial.println("Led -> Apagado");
        #ifdef DEBUG          
          Serial.print("Estado : ");
          Serial.println(state);
        #endif
        break;
      }    
    }
  }
}

// Funciones
void put_color(int R, int G, int B) {
  analogWrite(PIN_RED,R);
  analogWrite(PIN_GREEN,G);
  analogWrite(PIN_BLUE,B);
}
```

## Usando Platformio

1. Iniciar Platformio
   
   ![p1](/img/sesiones/percepcion/4/ejemplo2/platformio1.png)

   Si todo esta bien aparecera:

   ![p2](/img/sesiones/percepcion/4/ejemplo2/platformio2.png)

2. Crear nuevo proyecto
   
   ![p3](/img/sesiones/percepcion/4/ejemplo2/platformio3.png)

3. Seleccionar la plataforma y el lugar donde estara el proyecto.
   
   ![p4](/img/sesiones/percepcion/4/ejemplo2/platformio4.png)

   Si todo esta bien el resultado sera como el siguiente:

   ![p5](/img/sesiones/percepcion/4/ejemplo2/platformio5.png)
   
4. Abrir el archivo **main.cpp** y editarlo
   
   ![p6](/img/sesiones/percepcion/4/ejemplo2/platformio6.png)

5. Subir el codigo a la tarjeta
   
   ![p7](/img/sesiones/percepcion/4/ejemplo2/platformio7.png)

   Luego se procede a subir el codigo:

   ![p8](/img/sesiones/percepcion/4/ejemplo2/platformio8.png)

6. Ensayar el funcionamiento.
   
   ![p9](/img/sesiones/percepcion/4/ejemplo2/platformio9.png)

## Pruebas - Haciendo debug serial

Se puede hacer debug serial empleando el siguiente boton para ello:

![p10](/img/sesiones/percepcion/4/ejemplo2/platformio10.png)

A continuación se muestra la prueba de funcionamiento:

![p11](/img/sesiones/percepcion/4/ejemplo2/platformio11.png)


## Referencias

* https://mongoose.ws/documentation/tutorials/esp32/uart-bridge/
* https://ece353.engr.wisc.edu/serial-interfaces/uart-basics/
* https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/establish-serial-connection.html
* https://www.sparkfun.com/engineering_essentials
* https://docs.thinger.io/
* https://www.electronicwings.com/esp32/getting-started-with-esp32
* https://mongoose.ws/documentation/tutorials/esp32/uart-bridge/
