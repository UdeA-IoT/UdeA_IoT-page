---
sidebar_label: 'Ejemplo 1'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

# Ejemplo 1

## Requerimientos

Desarrollar una aplicación enviar comandos de manera serial para el control del encedido y apagado de un LED que se conecta en un ESP32.

## Hardware

Como punto de partida es necesario determinar los componentes de hardware necesarios para la aplicación. La siguiente tabla resume la lista:

|Elemento|Descripcion|
|--|--|
|1|Placa de desarrollo ESP32|
|2|Led|
|3|Resistencia de 330 Ohm|

Luego, es necesario determinar como sera la conexión de los elementos de hardware que hacer parte del sistema a implementar (**Archivo Fritzing**: [hardware.fzz](/img/sesiones/percepcion/4/ejemplo1/hardware.fzz)). A continuación se muestra el esquemático asociado al circuito:

<Image img={require('/img/sesiones/percepcion/4/ejemplo1/hardware_sch.png')} />

A continuación, se muestra el diagrama de conexión asociado al esquematico anterior:

<Image img={require('/img/sesiones/percepcion/4/ejemplo1/hardware_bb.png')} />

La siguiente tabla resume las conexiones:

|Puerto|Pin|Tipo|Nombre|Descripción|
|---|---|---|---|---|
|```10```|```GPIO16```|Output|```LIGHT1```|Puerto de control del LED|

## Software

Una vez definido el hardware, el siguiente paso consiste en determinar el software de acuerdo a los requerimientos que se dan. Para empezar, es necesario determinar los comandos que recibira la placa ESP32 para encender y apagar el led conectado a esta. Estos, se describen en la siguiente tabla:  

|Comando|Descripción|
|---|---|
|```H```| Comando empleado para encender el Led.|
|```L```| Comando empleado para apagar el Led.|

Con los requerimientos claros, el codigo fuente a implementar en el ESP32 se muestra a continuación:

```cpp
/* Entradas y salidas */
#define LIGHT1 26          // P26 (GPIO26)

/* Comandos */
#define LIGHT_ON 'H'       // Luz encendida  
#define LIGHT_OFF 'L'      // Luz apagada  

int cmd = 0; // Comnado entrado por serial

void setup() {
  // Configuración de los puertos digitales
  pinMode(LIGHT1, OUTPUT);    
  digitalWrite(LIGHT1, LOW);
  // Configuracion del puerto serial
  Serial.begin(9600); 
  
}

void loop() {
  // reply only when you receive data:
  if (Serial.available() > 0) {
    // read the incoming byte:
    cmd = Serial.read();

    // Encendido o apagado de la luz segun el comando
    if(cmd == LIGHT_ON) {
      digitalWrite(LIGHT1, HIGH);
      Serial.println("Light -> ON");
    }
    else if(cmd == LIGHT_OFF) {
      digitalWrite(LIGHT1, LOW);    
      Serial.println("Light -> OFF");
    } 
  }
}
```

Despues de codificar el programa en el IDE y descargarlo en la placa ESP32, el siguiente paso consiste en probar su funcionamiento.

## Pruebas

Una vez descargado el programa en el ESP, el siguiente paso consiste en probar el correcto funcionamiento del programa enviando comandos para lo cual se procede a realizar la prueba empleando el monitor serial del Arduino IDE (o empleando cualquier otra terminal serial [[link]](https://learn.sparkfun.com/tutorials/terminal-basics/arduino-serial-monitor-windows-mac-linux)). La siguiente figura muestra este procedimiento:

![serial_output](/img/sesiones/percepcion/4/ejemplo1/serial_output.png)

En la figura anterior, con la terminal serial a configurada a **9600 bps**, si se envian los caracteres 'H' (prender luz) y 'L' y el led apaga y prende tal y como se espera, todo estará bien y la prueba estará completada.

## Referencias

* https://mongoose.ws/documentation/tutorials/esp32/uart-bridge/
* https://ece353.engr.wisc.edu/serial-interfaces/uart-basics/
* https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/establish-serial-connection.html
* https://www.sparkfun.com/engineering_essentials
* https://docs.thinger.io/
* https://www.electronicwings.com/esp32/getting-started-with-esp32
* https://mongoose.ws/documentation/tutorials/esp32/uart-bridge/
