---
sidebar_label: 'Paso 1'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

# Paso 1 - Implentacion del programa en la plataforma

## Hardware

### Lista de componentes

|Elemento|Descripcion|
|--|--|
|1|Placa de desarrollo ESP32|
|2|Led|
|3|Resistencia de 330 Ohm|

### Conexion

A continuación se muestra el diagrama de conexión. El led se conecta al puerto P26 (GPIO26) de la tarjeta como se muestra a continuación:

![Diagrama](/img/sesiones/percepcion/4/ejemplo4/hardware_bb.png)

## Sofware

El programa que se descargara en la ESP32 se muestra a continuación:

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

## Prueba

Descargue el programa y abra la terminal serial a 9600 bps, luego pruebe enviando caracteres ```'H'``` (prender luz) y ```'L'``` a traves de esta. Si todo sale bien, se deberá prender y apagar el led conectado a esta. La siguiente figura muestra la salida en el monitor serial:

![salida_serial](/img/sesiones/percepcion/4/ejemplo4/serial_output.png)

Cuando la prueba resulte exitosa, vaya al paso 2 ([link](sesion4e_3)).
## Referencias

* https://mongoose.ws/documentation/tutorials/esp32/uart-bridge/
* https://ece353.engr.wisc.edu/serial-interfaces/uart-basics/
* https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/establish-serial-connection.html
* https://www.sparkfun.com/engineering_essentials
* https://docs.thinger.io/
* https://www.electronicwings.com/esp32/getting-started-with-esp32
* https://mongoose.ws/documentation/tutorials/esp32/uart-bridge/
