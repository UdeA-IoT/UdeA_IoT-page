---
sidebar_label: 'Introducción'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

# Capa de percepción - Sesión 4

:::note[**Objetivos**]
* Aprender el API de programación de Arduino para comunicar serialmente el ESP32 hardware externo.
* Aprender a realizar debug de software para microcontroladores mediante comunicacion serial.
* Implementar mediante comunicación serial un protocolo para comunicar aplicaciones de escritorio con firmware de microcontroladores. 
:::

## Referencias principales

* La mayor parte de esta clase tomará como base la lección 2 A deeper dive into IoT (lección 2) del curso IoT for Beginners ([link](https://github.com/microsoft/IoT-For-Beginners)).
* También mucha de la información se tomó de la pagina: https://randomnerdtutorials.com/ 
* ESP32 Arduino Core’s documentation ([link](https://espressif-docs.readthedocs-hosted.com/projects/arduino-esp32/en/latest/))
* Tutorial **Serial Communication** de Sparkfun ([link](https://learn.sparkfun.com/tutorials/serial-communication/serial-intro)).
* Tutorial **Circuit Playground Express Serial Communications** de Adafruit ([link](https://learn.adafruit.com/circuit-playground-express-serial-communications))
* Tutorial **Arduino Lesson 5. The Serial Monitor** de Adafruit ([link](https://learn.adafruit.com/adafruit-arduino-lesson-5-the-serial-monitor/overview))
* **UART: A Hardware Communication Protocol Understanding Universal Asynchronous Receiver/Transmitter**: ([link](https://www.analog.com/en/analog-dialogue/articles/uart-a-hardware-communication-protocol.html))
* Páginas de referencia fundamentales (para ver lo que se puede hacer): 
  * https://randomnerdtutorials.com/
  * https://www.adafruit.com/
  * https://www.sparkfun.com/
  * https://www.seeedstudio.com/
  * https://projecthub.arduino.cc/
  * https://www.hackster.io/ubidots/projects 

## Comunicación serial

Mediante la comunicación es posible que varios dispositivos puedan transferir y recibir información entre ellos tal y como se muestra en la siguiente figura ([link](https://docs.espressif.com/projects/esp-at/en/latest/esp32/Get_Started/Hardware_connection.html)). 

<Image img={require('/img/sesiones/percepcion/4/esp32-wroom-hw-connection.png')} />

La informacion puede ser transferida de manera paralela o serial, en estas, la diferencia radica en la cantidad de datos que se transfieren simultaneamente ([link](https://learn.adafruit.com/circuit-playground-express-serial-communications/overview)).

<Image img={require('/img/sesiones/percepcion/4/transferencia_de_bits.png')} />

Uno de los principales problemas de la transferencia paralela de datos tiene que ver con la cantidad de lineas empleadas. Por un lado cada linea empleada ocupa un puerto de hardware (pin de un microcontrolador por ejemplo); por el otro, los puertos son un recurso limitado, de modo que, si se implementa una interfaz de comunicación paralela, se estaran empleando muchos de los puertos solo en labores de comunicación, lo cual hara en que en el peor de los casos queden muy pocos puertos disponibles para la conexión de sensores y actuadores necesarios para que el microcontrolador interactue con el entorno.

Para trarar el problema anterior, surge la comunicación serial, en la cual, la información se pone en un bloque de datos (usualmente un byte) y se transmiten bit por bit siguiendo un formato como el mostrado a continuación ([link](https://learn.sparkfun.com/tutorials/serial-communication/all)):

<Image img={require('/img/sesiones/percepcion/4/serial_trama.png')} />

En la siguiente figura se muestra un ejemplo en el cual se transfieren dos tramas de datos ([link](https://learn.sparkfun.com/tutorials/serial-communication/all)):

<Image img={require('/img/sesiones/percepcion/4/trama_datos_serial.png')} />

El hardware para transmitir los dato es el **bus serial**. Un bus serial consiste de dos cables para la transmisión de los datos, de estos, uno de los cuales envia enviar y el otro de recibir. Por lo tanto, los dispositivos que tienen la capacidad de comunicarse de manera serial, deben tener dos pines: uno asociado al receptor **RX** y otro asociado al transmisor **TX**.
Es importante tener en cuenta que esas etiquetas **RX** y **TX** se refieren al dispositivo mismo. Entonces, el **RX** de un dispositivo debería ir al **TX** del otro y viceversa. La siguiente figura aclara esto:

<Image img={require('/img/sesiones/percepcion/4/pines_serial.png')} />

El hardware encargado de realizar la conversión de los datos de paralelo a serial (y viceversa) y asegurar la transferencia serial de estos se conoce como **UART (Universal Asynchronous Receiver/Transmitter)** y viene integrado en los microcontroladores:

<Image img={require('/img/sesiones/percepcion/4/uart.png')} />

Sin embargo, es importante aclarar que la comunicación serial empleando por **UART** no es la unica existente ya que con el paso de los años han emergido nuevos protocolos entre los que se destacan:
* USB (Universal Serial Bus).
* Ethernet.
* SPI (Serial Peripherical Interface).
* I2C (Inter-Integrated Circuit).

## API para comunicación serial de Arduino

En el API de Arduino ([link](https://www.arduino.cc/reference/en/)) se encuentran las principales funciones, clases y estructuras de datos que se usan para hacer programas en Arduino. En el link [Serial](https://www.arduino.cc/reference/en/language/functions/communication/serial/) de la sección **Communication** se acceden a la documentación de todas las funciones para establecer comunicación serial.

<Image img={require('/img/sesiones/percepcion/4/API_serial.png')} />

A continuación se describen las principales funciones del API empleadas mas comunmente para comunicación serial:

|Función|Descripción|
|---|---|
|```Serial.begin()```|Configura la velocidad de transmisión serial (bits por segundo = baud).<br /><br />**Sintaxis**:<br />```Serial.begin(speed)``` <br /><br />**Parámetros**: <li>**```speed```**: Velocidad de transmisión (**baudrate**). La velocidad solo puede tomar alguno de los siguientes valores: ```300, 1200, 2400, 4800, 9600, 14400, 19200, 28800,  38400, 57600, 115200```</li>|
|```Serial.print()```|Imprime los datos del puerto serial en formato ASCII.<br /><br />**Sintaxis**:<br />```Serial.print(val)```<br />```Serial.print(val, format)```<br /><br />**Parámetros**: <li>**```val```**: Valor a imprimir. El valor puede ser de cualquier tipo.</li>**```format```**: Formato de representación del ASCII (```DEC```, ```HEX```, ```OCT``` o ```BIN```).|
|```Serial.available()```|Obtiene el número de bytes (caracteres) disponibles por leer en el puerto serial. Estos son datos que ya han llegado y han sido almacenados en el buffer de recepción serial (el cual almacena 64 bytes).<br /><br />**Sintaxis**:<br />```Serial.available()```<br /><br />**Valores retornados**: Número de bytes disponibles para leer.|
|```Serial.read()```|Lee un dato que entra a través del serial.<br /><br />**Sintaxis**:<br />```Serial.read()```<br /><br />**Valores retornados**: Primer byte de los datos seriales disponibles (o ```-1``` si no hay datos disponibles). El tipo de dato leído es ```int```.|

Otras funciones del API, se muestran de manera mas resumida en la siguiente tabla:

|Función|Descripción|
|---|---|
|```Serial.end()```| Deshabilita la comunicación serial permitiendo que los pines ```RX``` y ```TX``` puedan ser usados como pines de entrada y salida (```I/O```).|
|```Serial.write(value)```|Escribe datos binarios a través del puerto serie. Los datos se envían como un byte o una serie de bytes (no human-readable: ```raw```).|
|```Serial.peek()```|Permite lectura sin remover datos. Para ello, retorna el proximo byte (como ```int```) de los datos seriales que entran sin removerlo del buffer serial interno (o ```-1``` si no hay datos disponibles).|
|```Serial.flush()```|Espera hasta que la transmisión de los datos seriales salientes se complete|
|```serialEvent()```|Función que se llama cuando hay datos en serie disponibles. Para mas información consultar el siguiente [link](https://docs.arduino.cc/built-in-examples/communication/SerialEvent)|


Es importante aclarar que las siguientes funciones son parte del API de Arduino. En caso de que se haga uso del ESP32, es necesario verificar si estas han sido portadas a esta plataforma en la pagina **Arduino core for the ESP32, ESP32-S2, ESP32-S3 and ESP32-C3** ([link](https://docs.espressif.com/projects/arduino-esp32/en/latest/)) o de lo contrario, el modelo de programación cambia y debera hacerse uso del **ESP-IDF Programming Guide** ([link](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/)). Afortunadamente, la comunicación serial por **UART** si tiene soporte para el API Arduino-ESP32 (ver [tabla](https://docs.espressif.com/projects/arduino-esp32/en/latest/libraries.html)).

## Puertos empleados

Antes de empezar es necesario determinar los protocolos de comunicación serial soportados por el microcontrolador y los pines en los cuales estos se implementan. Esto se hace al revisar en la documentación de la placa el diagrama de pines. A continuación se mostrará el caso para las placas Arduino UNO y ESP32 disponibles en el laboratorio:

### ESP32

A continuación se muestra el diagrama de pines de la placa **NODEMCU ESP-32S** la cual se encuentra disponible en el laboratorio:

<Image img={require('/img/sesiones/percepcion/4/nodemcu_32s_pin.png')} />

 Si se consulta la tabla de definición de pines del datasheet del **Nodemcu-32s** ([link](https://docs.ai-thinker.com/_media/esp32/docs/nodemcu-32s_product_specification.pdf)), los pines de interes seran:

    |No.| Pin Name |Functional Description|
    |---|---|---|
    |34 |```RX```|```GPIO3```, ```U0RXD```, ```CLK_OUT2```|
    |35 |```TX```|```GPIO1```, ```U0TXD```, ```CLK_OUT3```, ```EMAC_RXD2```|
    |16 |```SD2```|```GPIO9```, ```SD_DATA2```, ```SPIHD```, ```HS1_DATA2```, ```U1RXD```|
    |17 |```SD3```|```GPIO10```, ```SD_DATA3```, ```SPIWP```, ```HS1_DATA3```, ```U1TXD```|
    
    Los pines ```TX``` y ```RX``` estan conectados con el chip que hace la conversion Serial a USB por lo que no pueden ser usados para otro proposito cuando se estan usando para la transmisión serial en la aplicación que corre la placa. Para mas información puede consultar la sección **Establish Serial Connection with ESP32** ([link](https://docs.espressif.com/projects/esp-idf/en/stable/esp32/get-started/establish-serial-connection.html)).
 

### Arduino UNO

A continuación se muestra el diagrama de pines para el arduino UNO (la otra placa disponible en el laboratorio).

<Image img={require('/img/sesiones/percepcion/4/Pinout-UNOrev3_latest.png')} />

 En este caso tenemos:

    |No.| Pin Name |Functional Description|
    |---|---|---|
    |```0```|```RX<-0``` |```D0/RX```, ```PD0```|
    |```1``` |```TX->1``` |```D1/TX```, ```PD1```|

Estos pines al ser conectados, no deberan ser usados como puertos digitales si la aplicación del arduino usa el puerto serial.

## Aplicaciones de la comunicación serial

Cualquiera de las placas disponibles en el laboratorio tiene al menos un puerto serial (UART o SUART). A traves de este puerto es posible: 
1. La comunicación entre entre dos placas a traves de la conexión cruzada entre los pines de transmisión (```TX```) y recepción (```RX```) de estas ([link](https://www.hackster.io/onedeadmatch/custom-uart-protocol-on-esp32-1e2fa4)). 
   
   ![conexion_esp32](/img/sesiones/percepcion/4/oscup_mcu_mcu.jpg)
   
2. La comunicación entre una placa y el computador mediante USB (haciendo uso de un adaptador USB a Serial) el cual suele venir integrado con las placas ([link](https://www.mathworks.com/help/supportpkg/arduinoio/ug/configure-setup-for-esp32-hardware.html)).
   
   ![pc-esp32](/img/sesiones/percepcion/4/esp32_usb.png)

Cuando se hace uso del puerto serial tenemos principalmente dos escenarios de aplicacion:
1. Debug de aplicaciones complejas.
2. Comunicación y transmisición de diferentes tipos de información (comandos, estado, Valor de variables, etc.) según el tipo de aplicación que se use.

### Escenario 1 - Debug de aplicaciones

Una de las aplicaciones mas utilies del puerto serial es que facilita el **debug** de aplicaciones gracias a que por medio de este se pueden imprimir, en tiempo de ejecución, **mensajes de log** que sirven como verificar el correcto funcionamiento de la logica del programa al usar un programa como el monitor serial o cualquier programa similar. 

Es muy comun imprimir variables (que pueden indican el estado o valor de un sensor, mensajes de la aplicación, etc).

En el siguiente ejemplo ([link](https://github.com/UdeA-IoT/clases-IoT_capa-percepcion_2023-2/tree/main/dia4/debug_esp32)) se muestra como hacer para el montaje mostrado a continuación:

![esp32_debug-serial](/img/sesiones/percepcion/4/esp32_debug-serial.png)

### Escenario 2 - Comunicación con otras placas y con el PC

Por medio de operaciones de lectura y escritura en el puerto serial, es posible transmitir información desde y hacia otro dispositivo de hardware que tenga interfaz serial (Otra placa, computador o hardware especifico).

Para comprender esto en el siguiente [directorio](https://github.com/UdeA-IoT/clases-IoT_capa-percepcion_2023-2/tree/main/dia4/serial-esp32-arduino) explicara paso a paso una aplicación mediante la cual se enviaran comandos por serial desde un el PC al ESP32 para una tarea sencilla como prender y apagar un led.

![comunicacion_serial](/img/sesiones/percepcion/4/comunicacion_serial.png)

