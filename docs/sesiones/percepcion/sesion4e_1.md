---
sidebar_label: 'Enunciado'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

# Ejemplo 4 - Aplicación de control iluminación

El objetivo de esta sesión es explicar paso a paso como se construye una aplicación sencilla en la ESP32 que se comunique de manera serial con una aplicación que se esta ejecutando en un PC o RPi.

## Enuciado de la aplicación

Desarrolle una aplicación que permita encender y apagar un Led para el siguiente hardware:

![hardware_serial](/img/sesiones/percepcion/4/ejemplo4/hardware_bb.png)

La aplicación se conectara mediante el serial enviando dos comandos basicos para modificar el estado del led:

* **```H```**: Comando empleado para encender el Led.
* **```L```**: Comando empleado para apagar el Led.

El resultado final (si todo sale bien) de la aplicación de control es el siguiente:

![interfaz_grafica](/img/sesiones/percepcion/4/ejemplo4/ui_python.png)

## Implementación paso a paso


### Parte 1 - Implementación del firmware de la ESP32

Inicialmente, según los requerimientos de la aplicación, lo primero que se debe hacer el codificar el programa que va a descargarse en el ESP32. Teniendo en cuenta los puertos que se emplearán (ver diagrama de conexión) el programa queda como se muestra a continuación:

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

Una vez codificado el programa y descargado en la ESP32, se procede a realizar la prueba empleando el monitor serial del Arduino IDE. La siguiente figura muestra este procedimiento:

![serial_output](/img/sesiones/percepcion/4/ejemplo4/serial_output.png)

Para mas información sobre este paso puede ir al siguiente [link](sesion4e_2#).

### Parte 2 - Implementación del software de la aplicación de escritorio

Para desarrollar la aplicación de escritorio se empleo Python como lenguaje de desarrollo. Inicialmente, se hizo una aplicación que enviara los comandos por consola (mas facil de implementar) y posteriormente, se procedio a desarrollar una interfaz de usuario (un poco mas amigable) cuyo funcionamiento es similar al de la aplicación en consola

:::danger

Antes de empezar tenga en cuenta que los nombres de los puertos en Linux y Windows son diferentes. Este ejemplo se probo en una maquina con Windows. Si va a realizar la prueba en otro sistema operativo consulte la forma como este nombre los puertos y haga los cambios pertinentes en la parte asociada a estos de lo contrario, el codigo sacara errores.

:::

1. Desarrollo de la aplicación de consola en python ([link](sesion4e_3#)).

![app-consola_python](/img/sesiones/percepcion/4/ejemplo4/app_python.png)

2. Desarrollo de la aplicación con interfaz grafica usando python ([link](sesion4e_4#)).

![app-ui_output](/img/sesiones/percepcion/4/ejemplo4/ui_python.png)s


## Referencias

* https://mongoose.ws/documentation/tutorials/esp32/uart-bridge/
* https://ece353.engr.wisc.edu/serial-interfaces/uart-basics/
* https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/establish-serial-connection.html
* https://www.sparkfun.com/engineering_essentials
* https://docs.thinger.io/
* https://www.electronicwings.com/esp32/getting-started-with-esp32
* https://mongoose.ws/documentation/tutorials/esp32/uart-bridge/
