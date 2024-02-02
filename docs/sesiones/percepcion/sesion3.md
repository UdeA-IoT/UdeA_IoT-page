---
sidebar_label: 'Sesión 3'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

# Capa de percepción - Sesión 3

:::note[**Objetivos**]
* Aprender a usar la tarjeta de desarrollo ESP32.
* Comprender la API básica de entrada y salida del lenguaje Arduino.
:::

## Referencias principales

* La mayor parte de esta clase tomará como base la lección 2 A deeper dive into IoT (lección 2) del curso IoT for Beginners ([link](https://github.com/microsoft/IoT-For-Beginners)).
* También mucha de la información se tomó de la pagina: https://randomnerdtutorials.com/ 
* ESP32 Arduino Core’s documentation ([link](https://espressif-docs.readthedocs-hosted.com/projects/arduino-esp32/en/latest/))
* Páginas de referencia fundamentales (para ver lo que se puede hacer): 
  * https://randomnerdtutorials.com/
  * https://www.adafruit.com/
  * https://www.sparkfun.com/
  * https://www.seeedstudio.com/
  * https://projecthub.arduino.cc/
  * https://www.hackster.io/ubidots/projects 

## Arduino Framework

Cuando hablamos de arduino no solo nos referimos a un microcontrolador especifico, en realidad estamos hablando del **framework para microcontroladores** mas popular en la actualidad.

**Arduino**  es una plataforma opensource de electronica que combina software y hardware. Al ser esta plataforma open hardware, es posible usar el modelo de programación de Arduino para escribir codigo para cualquier otra plataforma compatible con Arduino (placas genericas o de otroa fabricantes).

El modelo de programación de arduino esta basado en el **API de arduino** el cual espone un conjunto de funciónes y estructuras (constantes, variables, tipos de datos, objetos, etc) que permiten la interacción del microcontrolador con hardware externo (sensores y actuadores). La información del API se encuentra en la pagina **Language Reference** ([link](https://www.arduino.cc/reference/en/)).

<Image img={require('/img/sesiones/percepcion/3/arduino-reference.png')} />

### Funciones basicas del API de Arduino

Las funciones basicas del API de Arduino se encuentran online en **Language Reference** ([link](https://www.arduino.cc/reference/en/))

### Entrada y Salida digital

Las funciones de entrada y salida permiten básicamente dos cosas: 
1. Configurar los puertos (**pines**) como entradas o salidas digitales.
2. Leer o escribir dichos puertos de acuerdo a la forma como fueron configurados.

|Función|Información de la función|
|--|--|
|```digitalWrite()```|**Descripción** ([link](https://www.arduino.cc/reference/en/language/functions/digital-io/digitalwrite/)): <br />Escribe un valor HIGH o LOW  en un puerto determinado. <br /><br />**Sintaxis**:  <br />```digitalWrite(pin, value)```<br /><br />**Parámetros**: <li> **pin**: Número del puerto del Arduino. </li> <li> **value**: Valor que se escribe en el puerto (```HIGH``` o ```LOW```).</li>|
|```digitalRead()```|**Descripción** ([link](https://www.arduino.cc/reference/en/language/functions/digital-io/digitalread/)):<br />Lee el valor de un puerto determinado.<br /><br />**Sintaxis**: <br />```digitalRead(pin)```<br /><br />**Parámetros**: <li>**pin**: Pin del Arduino a ser leído. </li> <li>**Valores retornados**: El valor del puerto al ser leído (```HIGH``` o ```LOW```).</li>|
|```pinMode()```|**Descripción** ([link](https://www.arduino.cc/reference/en/language/functions/digital-io/pinmode/)):<br />Permite configurar un puerto como entrada o salida. <br /><br />**Sintaxis**: <br />```pinMode(pin, mode)```<br /><br />**Parámetros**: <li>**pin**: Pin del Arduino a ser configurado </li> <li>**mode**: Modo: ```INPUT```, ```OUTPUT``` o ```INPUT_PULLUP```.</li>|

### Funciones de entrada y salida análoga

Permiten interactuar (leer o escribir) con puertos que funcionan como entradas o salidas análogas. La siguiente tabla muestra resume algunas de estas:

|Función|Información de la función|
|---|---|
|```analogRead()```|**Descripción** ([link](https://www.arduino.cc/reference/en/language/functions/analog-io/analogread/)):<br />Lee el valor de un puerto análogo determinado devolviendo un valor entero asociado al voltaje que tiene este puerto.<br /><br />**Sintaxis**:<br />```analogRead(pin)```<br /><br />**Parámetros**:<br /><li>**pin**: Número del puerto análogo (```A0``` – ```A5``` para la mayoría de las placas) del Arduino</li><br /><br />**Valores retornados**:<br />Valor análogo  leído en el pin. El rango dependerá de la resolución del conversor análogo digital asociado a el pin (0 – 1024 cuando la resolución es de 10 bits o 0 – 4096 cuando la resolución es de 12 bits).|
|```analogWrite()```|**Descripción** ([link](https://www.arduino.cc/reference/en/language/functions/analog-io/analogwrite/)):<br />Escribe un valor análogo (modificando el valor del ciclo de dureza de una onda PWM) a un puerto.<br /><br />**Sintaxis**:<br />```analogWrite(pin, value)```<br /><br />**Parámetros**: <li>**pin**: Pin del Arduino (denotado en la placa con el símbolo ~) en el que se escribe.</li><li>**value**: Ciclo de dureza entre cero (siempre apagado) y 255 (siempre on).</li>|

### Bases de tiempo

Son funciones empleadas para la crear retardos y generar marcas de tiempos en los programas, existen varias funciones para este fin como ```delay()```, ```delayMicroseconds()```, ```micros()``` y ```millis()```. La siguiente tabla describe la función ```delay()``` que fue la empleada en los ejemplos anteriores:

|Función|Información de la función|
|---|---|
|```delay()```|**Descripción** ([link](https://www.arduino.cc/reference/en/language/functions/time/delay/)): <br />Detiene el programa por una cantidad de tiempo (en milisegundos) especificada como parámetro.<br /><br />**Sintaxis**:<br />```delay(ms)```<br /><br />**Parámetros**:<li>**ms**: Número de milisegundos a detener el programa.</li>|

### Funciones de interacción con el puerto serial

Son funciones empleadas para la configuración e interacción con el puerto serial ([link](https://www.arduino.cc/reference/en/language/functions/communication/serial/)). La siguiente figura muestra algunas funciones de uso común

|Función|Descripción|
|---|---|
|```Serial.begin()```|Configura la velocidad de transmisión serial (bits por segundo = baud).<br /><br />**Sintaxis**:<br />```Serial.begin(speed)``` <br /><br />**Parámetros**: <li>**```speed```**: Velocidad de transmisión</li>|
|```Serial.print()```|Imprime los datos del puerto serial en formato ASCII.<br /><br />**Sintaxis**:<br />```Serial.print(val)```<br />```Serial.print(val, format)```<br /><br />**Parámetros**: <li>**```val```**: Valor a imprimir. El valor puede ser de cualquier tipo.</li><li>**```format```**: Formato de representación del ASCII (```DEC```, ```HEX```, ```OCT``` o ```BIN```).</li>|
|```Serial.available()```|Obtiene el número de bytes (caracteres) disponibles por leer en el puerto serial. Estos son datos que ya han llegado y han sido almacenados en el buffer de recepción serial (el cual almacena 64 bytes).<br /><br />**Sintaxis**:<br />```Serial.available()```<br /><br />**Valores retornados**: Número de bytes disponibles para leer.|
|```Serial.read()```|Lee un dato que entra a través del serial.<br /><br />**Sintaxis**:<br />```Serial.read()```<br /><br />**Valores retornados**: Primer byte de los datos seriales disponibles (o ```-1``` si no hay datos disponibles). El tipo de dato leído es ```int```.|

### Pasos para programar un dispositivo usando el Framework de Arduino

:::tip
**Arduino Cheat Sheet**: Existen referencias breves que muestran de manera resumida el API de arduino. La referecia **Arduino Cheat Sheet** ([link](/cheat_sheet/Arduino_Cheat_Sheet.pdf)) es uno de estos casos ([URL principal](https://github.com/liffiton/Arduino-Cheat-Sheet))
:::

Para usar el API de arduino es necesario tener en cuenta los siguientes pasos:
1. Si la placa es generica, verificar esta es Arduino compatible ([link wikipedia](https://en.wikipedia.org/wiki/List_of_Arduino_boards_and_compatible_systems))
2. Identificar claramente, las caracteristicas, los pines y la funcionalidad de la placa a usar. Para esto es necesario revisar el manual de usuario de la placa, A continuación se muestran algunos ejemplos: 
   * Arduino UNO ([link](https://docs.arduino.cc/hardware/uno-rev3)) 
   * NodeMCU-32s ([link](https://docs.ai-thinker.com/_media/nodemcu32-s_specification_v1.3.pdf))
3. Proceder a programar el codigo del firmware siguiendo el modelo de programación de Arduino.

<details>
  <summary>**Ejemplos introductorios**</summary>
  <div>
    A continuación se muestra mediante varios ejemplos como se aplican los pasos mencionados para tres de las plataformas basadas en microcontroladores disponibles en el laboratorio:
    <details>
      <summary>
        **Arduino UNO**
      </summary>
      <div>
        **Material requerido**
        1. Arduino UNO.
        2. Cables USB.
        3. Grove - Starter Kit v3 ([link](https://wiki.seeedstudio.com/Grove_Starter_Kit_v3/))
        4. Base Shield V2 ([link](https://wiki.seeedstudio.com/Base_Shield_V2/))
      
      **Pinout**

      Para empezar a trabajar con cualquier plataforma de desarrollo es necesario conocer como mínimo el mapa de pines, el cual se muestra a continuación:
      
      <Image img={require('/img/sesiones/percepcion/2/arduino_uno-pines.png')} />

      Es importante notar, que los pines son multifuncionales, es decir, pueden ser empleados para diferentes funciones. La determinación de la función que puede llevar un pin se hace por programación.
      
      Para mas información sobre esta tarjeta, le recomendamos revisar el link **Overview of the Arduino UNO Components** [[link]](https://docs.arduino.cc/tutorials/uno-rev3/intro-to-board).

      **Funciones**

      El documento Arduino Cheat Sheet [[link]](/cheat_sheet/Arduino_Cheat_Sheet.pdf) contine un resumen de algunas de las principales funciones que se usan para programar plataformas Arduino. Para mas información sobre estas puede consultar la sección Language Reference.

      **Librerias**

      Ademas de las funciones, propias del API de Arduino, es posible hacer uso de librerias para agregar funcionalidad extra (tal y como sucede con el software). Una de las mayores fortalezas de la plataforma Arduino se encuentra en que esta posee una gran numero de librerias. En la sección **Libraries** [[link](https://www.arduino.cc/reference/en/libraries/)] se encuentra toda la información relacionada con diferentes librerias existentes, hardware soportado y, adicionalmente, se muestra como realizar una libreria. Hay tres cosas fundamentales para trabajar con librerias:
      1. Instalación de librerias (**Installing Libraries** [[link]](https://docs.arduino.cc/software/ide-v1/tutorials/installing-libraries))
      2. Escritura de librerias (**Writing a Library for Arduino** [[link]](https://docs.arduino.cc/learn/contributions/arduino-creating-library-guide))
      3. Guia de estilo (**Arduino Style Guide for Creating Libraries** [[link]](https://docs.arduino.cc/learn/contributions/arduino-library-style-guide))
   
      **Ejemplos basicos**

      Cuando se tienen unas nociones basicas de programación, la mejor manera para aprender consiste en leer, ejecutar y comprender código a traves del desarrollo de ejemplos sencillos. Luego, y luego, aplicando lo ya aprendido realizar la adaptación del código al caso particular. Para hacer esto, nuestra recomendación es que tenga a la mano los siguientes materiales:

      |Item|Material|Link|
      |---|---|---|
      |1 |Language Reference|https://www.arduino.cc/reference/en/|
      |2|Built-in Examples|https://docs.arduino.cc/built-in-examples/|
      |3|Libraries|https://www.arduino.cc/reference/en/libraries/|
      |4|Tutorials|https://docs.arduino.cc/tutorials/|
      
      Como punto de partida tenga a la mano, minimamente los enlaces asociados a los items 1 y 2 de la tabla anterior y la **Arduino Cheat Sheet** [[link]](/cheat_sheet/Arduino_Cheat_Sheet.pdf). La idea es empezar a mirar unos cuantos ejemplos los cuales vienen implementados en IDE de arduino tal y como se muestra en la siguiente figura:

      <Image img={require('/img/sesiones/percepcion/3/ejemplos_arduino-uno.png')} />

      Veamos algunos ejemplos.

      **Ejemplo 1**

      En este ejemplo se pone a parpadear un led a un periodo de 2 segundos. La descripción completa del ejemplo se encuentra en Blink. El codigo se muestra a continuación:

      ```cpp
      void setup() {
        pinMode(LED_BUILTIN, OUTPUT);
      }
        
      // the loop function runs over and over again forever
      void loop() {
        digitalWrite(LED_BUILTIN, HIGH);  
        delay(1000);                       
        digitalWrite(LED_BUILTIN, LOW);    
        delay(1000);                       
      }
      ```

      Tambien se muestra el esquematico asociado:

      ![esquematico](https://camo.githubusercontent.com/a7f39f62dfdfc906aa477e6af7d7b8ee11e0023aae9e05cab9c2eb8ca34690a8/68747470733a2f2f646f63732e61726475696e6f2e63632f7374617469632f63386462656666373836653532363831633364306539656539353235653134302f32393131342f736368656d617469632e706e67)

      Y el diagrama de conexión:

      ![circuito](https://camo.githubusercontent.com/0902622cb0474c0f6f32cf8dfcff68a96b374091e9f95a6d8bfa70ae7120a3ef/68747470733a2f2f646f63732e61726475696e6f2e63632f7374617469632f35326332333864626130396332653430623639653036313266663032656630662f61366433362f636972637569742e706e67)

      **Ejemplo 2**

      Este ejemplo se encuentra en **How to Wire and Program a Button** [[link]](https://docs.arduino.cc/built-in-examples/digital/Button). En éste se prende un led cuando se presiona un switch.

      El codigo asociado se muestra a continuación:

      ```cpp
      const int buttonPin = 2;     
      const int ledPin =  13;      
      
      int buttonState = 0;         
      
      void setup() {
        pinMode(ledPin, OUTPUT);
        pinMode(buttonPin, INPUT);
      }
      
      void loop() {
        buttonState = digitalRead(buttonPin);
        if (buttonState == HIGH) {
          digitalWrite(ledPin, HIGH);
        } 
        else {
          digitalWrite(ledPin, LOW);
        }
      }
      ```

      El esquematico asociado se muestra a continuación:

      ![sch](https://camo.githubusercontent.com/f190462dad109bfb99632d22c074bbb5a204333767514ae96fa17a7369faaf5b/68747470733a2f2f646f63732e61726475696e6f2e63632f7374617469632f66623834343962343833346466626266336330333232336338626333653562352f61366433362f736368656d617469632e706e67)

      Finalmente, el diagrama de conexión es el siguiente:

      ![bb](https://camo.githubusercontent.com/c43feb60295b946c18e3e48e847d4ebf94c5911a4731de42342a8bba6f0078af/68747470733a2f2f646f63732e61726475696e6f2e63632f7374617469632f37333730326565313231383630666130346337663664623562633737313833622f61366433362f636972637569742e706e67)

      **Ejemplo 3**

      Este ejemplo es tomado de **Fading** [[link]](https://docs.arduino.cc/built-in-examples/analog/Fading). En este ejemplo se modifica el brillo de un led de manera automatica.

      ```cpp
      int ledPin = 9;    
      
      void setup() {
        // nothing happens in setup
      }
      
      void loop() {
        for (int fadeValue = 0 ; fadeValue <= 255; fadeValue += 5) {
          analogWrite(ledPin, fadeValue);
          delay(30);
        }
        
        for (int fadeValue = 255 ; fadeValue >= 0; fadeValue -= 5) {
          analogWrite(ledPin, fadeValue);
          delay(30);
        }
      }
      ```

      El esquematico del ejemplo se muestra a continuación:

      ![sch](https://camo.githubusercontent.com/20c02f5abdbe9be94b6744cbf507163a2fc3e8d699c3d006b58fd6b839e8ee56/68747470733a2f2f646f63732e61726475696e6f2e63632f7374617469632f64653432623364333938636634303736386331333530383933323432386664622f61366433362f736368656d617469632e706e67)

      Finalmente, las conexiones son las siguientes:

      ![bb](https://camo.githubusercontent.com/b1cf5dad6cb08bb993cea2b3f4e63ec2bc749d2016441dd08332e84c7643d443/68747470733a2f2f646f63732e61726475696e6f2e63632f7374617469632f30373962316261623337353836303361353663356439386531663539613838652f61366433362f636972637569742e706e67)

      **Ejemplo 4**

      Este ejemplo es tomado de **Analog Read Serial** [[link]](https://docs.arduino.cc/built-in-examples/basics/AnalogReadSerial). Aqui, se lee un potenciometro y se imprime su estado a traves del monitor serial.

      ```cpp
      void setup() {
        Serial.begin(9600);
      }
      
      void loop() {
        int sensorValue = analogRead(A0);
        Serial.println(sensorValue);
        delay(1);        
      }
      ```

      El esquematico se muestra a continuación:

      ![sch](https://camo.githubusercontent.com/1cbb6d7effc07dd7dc934045e267b0efb266228f55f8a2f7a09afbb7e02f41c5/68747470733a2f2f646f63732e61726475696e6f2e63632f7374617469632f33626238343265633038623861383366383863316137633332383030666534312f61366433362f736368656d617469632e706e67)

      Finalmente, el diagrama de conexión es el siguiente:

      ![bb](https://camo.githubusercontent.com/5c2385e4b61333826b649fc4b8d703e79b10ba443f1b6353e49bd0973cc75133/68747470733a2f2f646f63732e61726475696e6f2e63632f7374617469632f31303834326230343939613565346533373061656463643232326235326532632f35613139302f636972637569742e706e67)

      **Ejemplo 5**

      Este ejemplo es tomado de **Analog In, Out Serial** [[link]](https://docs.arduino.cc/built-in-examples/analog/AnalogInOutSerial). Aqui, se usa un potenciometro para controlar el brillo de un led; adicionalmente, se imprime su estado a traves del monitor serial.

      ```cpp
      const int analogInPin = A0;  
      const int analogOutPin = 9; 
      
      int sensorValue = 0;        
      int outputValue = 0;        
      
      void setup() {
        Serial.begin(9600);
      }
      
      void loop() {
        sensorValue = analogRead(analogInPin);
        outputValue = map(sensorValue, 0, 1023, 0, 255);
        analogWrite(analogOutPin, outputValue);
        Serial.print("sensor = ");
        Serial.print(sensorValue);
        Serial.print("\t output = ");
        Serial.println(outputValue);
        delay(2);
      }
      ```

      El esquematico de este ejemplo es el siguiente:

      ![sch](https://camo.githubusercontent.com/2d63517e456c044ff2c3c47a9a84f490f105875a857f3d26bf9ab111caec3925/68747470733a2f2f646f63732e61726475696e6f2e63632f7374617469632f33396135646136653036633531333035666130626239303266336361623165332f61366433362f736368656d617469632e706e67)

      Por otro lado, las conexiones entre los componentes se muestran a continuación:

      ![bb](https://camo.githubusercontent.com/68816c69fd9d58266b610905348e2dce49e39e4a8723da0cf2a558a008650081/68747470733a2f2f646f63732e61726475696e6f2e63632f7374617469632f37646266623462346330393062613162633532633261373739383232623866392f61366433362f636972637569742e706e67)

      **Implementación de los ejemplos**      

      Para implementar cada uno de los ejemplos se pueden llevar a cabo los siguientes pasosEl proceso de trabajo a lo largo de esta sesión de trabajo será (siendo los pasos 2 y 3 son intercambiables):
      1. Escribir el programa en el IDE
      2. Descargar codigo.
      3. Montar circuito.
      4. Probar.
      </div>
    </details>
    <details>
      <summary>
        **ESP8266**
      </summary>
      <div>
        El NodeMCU es una plataforma de código abierto con conectividad wifi basada en el **SoC ESP8266** ([datasheet](https://github.com/UdeA-IoT/clases-IoT_capa-percepcion_2023-2/blob/main/dia3/esp8266/0a-esp8266ex_datasheet_en.pdf)). Esto la hace una plataforma ideal para el desarrollo de proyectos IoT.

        **Material requerido**
        
        1. Tarjeta NodeMcu V3 para ESP8266 
        2. Cable USB tipo C.
        3. Grove - Starter Kit v3 ([link](https://wiki.seeedstudio.com/Grove_Starter_Kit_v3/))
        4. Grove Base Shield for NodeMCU V1.0
         ([link](https://wiki.seeedstudio.com/Grove_Base_Shield_for_NodeMCU_V1.0/))
        
        **Trabajo previo con fritzing**
              
        Para realizar prototipado empleando elementos (de diferentes fabricantes) disponibles en kits de desarrollo a trabajar en el laboratorio siga los pasos ilustrados en el tutorial [How to Add Components in Fritzing](https://steemit.com/utopian-io/@thinkingmind/how-to-add-components-in-fritzing) (para comprender bien el procedimiento puede ver el siguiente [video](https://www.youtube.com/watch?v=lEEkYk5IQVY) antes de empezar). Para ello agregar los siguientes componentes:
        1. **NodeMCU y otros componentes**: Estos componentes se pueden obtener del siguiente [repositorio](https://github.com/AchimPieters/Fritzing-Custom-Parts) mas exactamente realizar la descarga de la siguiente [pagina](https://github.com/AchimPieters/Fritzing-Custom-Parts/releases/tag/0.0.2) seleccionando el archivo [Fritzing.parts](https://github.com/AchimPieters/Fritzing-Custom-Parts/releases/download/0.0.2/Fritzing.parts.zip) (Pagina del autor: [https://www.studiopieters.nl/esp8266-programmer/](https://www.studiopieters.nl/esp8266-programmer/))
        2. **Grove**: Descargar el archivo [seeed_fritzing_parts.fzbz](https://github.com/Seeed-Studio/fritzing_parts/blob/master/seeed_fritzing_parts.fzbz) del siguiente [repositorio](https://github.com/Seeed-Studio/fritzing_parts)
        3. **Elegoo**: Las partes se encuentran en el siguiente [repositorio](https://github.com/marcinwisniowski/ElegooFritzingBin). Para ello descargue [Elegoo-0.6.3.fzbz](https://github.com/marcinwisniowski/ElegooFritzingBin/releases/download/0.6.3/Elegoo-0.6.3.fzbz)
        4. **Adafruit**: Descargue el siguiente archivo [Fritzing-Library-master.zip](https://github.com/adafruit/Fritzing-Library/archive/master.zip), luego descomprima y agregue a la libreria el archivo **AdaFruit.fzbz**.
        
        Una vez hecho lo anterior estara en la facultad de dibujar diagramas y montajes con los diferentes componentes del laboratorio.

        **Pinout**

        Tal y como se menciono en clases anteriores, siempre el punto de partida es conocer el diagrama de pines de la tarjeta de desarrollo; este se muestra a continuación:

        <Image img={require('/img/sesiones/percepcion/2/Node-MCU-Pinout.png')} />

        El mapa de pines del NodeMCU ESP8266:
         * 17 GPIO’s
         * SPI
         * I2C (implemented on software)
         * I2S interfaces with DMA
         * UART
         * 10-bit ADC

         Adicionalmente, el esquema de numeración de los pines de la tarjeta NodeMCU (por ejemplo el pin marcado como ```D0```) es diferente del esquema de numeración del ESP8266 (esquema interno). Por ejemplo, el pin ```D0``` de la tarjeta esta mapeado al pin interno ```GPIO16```. La recomendación es usar el esquema de numeración externo. 

         La siguiente tabla muestra una equivalencia entre la numeración de la tarjeta y la numeración interna:

         |NodeMCU pin | ESP8266 pin |
         |---|---|
         |D0	| GPIO16 |
         |D1	| GPIO5 |
         |D2	| GPIO4 |
         |D3	| GPIO0 |
         |D4	| GPIO2 |
         |D5	| GPIO14 |
         |D6	| GPIO12 |
         |D7	| GPIO13 |
         |D8	| GPIO15 |
         |D9	| GPIO3 |
         |D10| GPIO1 |
         |D11| GPIO9 |
         |D12| GPIO10 |

         Según la tabla anterior, es posible codificar sketches usando cualquiera de las dos nomenclaturas. Para comprender lo anterior observe el siguiente fragmento de código donde se usa el pin ```D2``` (```GPIO4```) como salida.
        
        * **Nomenclatura del NodeMCU**
    
            ```cpp
            pinMode(D2, OUTPUT);
            digitalWrite(D2, HIGH);
            ```
        
        * **Nomenclatura del ESP8266**
        
            ```cpp
            pinMode(4, OUTPUT);
            digitalWrite(4, HIGH);
            ```
        
        Es importante tener en cuenta que el pin ```D0``` (```GPIO16```) solo puede ser usado para ```GPIO read/write```. No soporta ```open-drain/interrupt/PWM/I²C``` o ```1-Wire```. Para comprender mas sobre el esquema de mapeo ver la pagina **ESP8266 Pinout Reference: Which GPIO pins should you use?** ([link](https://randomnerdtutorials.com/esp8266-pinout-reference-gpios/))

        **Arduino core for ESP8266 WiFi chip**

        Gracias a este pluging ([Arduino core for ESP8266 WiFi chip](https://github.com/esp8266/Arduino)) es posible programar el ESP8266 usando el funciones y librerias propias de API de arduino.

        Para consultar la documentación del **ESP8266 Arduino core** puede consultar el siguiente link [[Documentación en ingles](https://arduino-esp8266.readthedocs.io/en/3.0.2/)|[Documentación en español](https://esp8266-arduino-spanish.readthedocs.io/es/latest/)].
        
        En el siguiente [link](/cheat_sheet/ESP8266_cheat_sheet.pdf) se resumen algunas de las funciones del pluging del arduino para el ESP8266.
        
        Para usar el **ESP8266 Arduino core** siga las instrucciones mostradas en el siguiente [tutorial](https://learn.sparkfun.com/tutorials/esp8266-thing-hookup-guide/all#installing-the-esp8266-arduino-addon).

        A continuación se van a mostrar los ejemplos hechos en Arduino adaptados a la plataforma ESP8266.

        **Ejemplo 1**

        Poner parpadear un led a un periodo de 2 segundos usando el led de la tarjeta NodeMCU. (**Código tomado de Cómo programar NodeMCU con el IDE de Arduino** [[link]](https://programarfacil.com/esp8266/como-programar-nodemcu-ide-arduino/))

        ```cpp
        #define LED_BUILTIN 2
        
        void setup() {
          pinMode(LED_BUILTIN, OUTPUT);
        }
        
        // the loop function runs over and over again forever
        void loop() {
          digitalWrite(LED_BUILTIN, HIGH);  
          delay(1000);                       
          digitalWrite(LED_BUILTIN, LOW);    
          delay(1000);                       
        }
        ```

        El funcionamiento (tomado de la pagina original) se muestra a continuación:

        ![imagen](https://camo.githubusercontent.com/3639d45a4cd14a5916f9f32d56a7dbd518d71c4ddd763a61a696552f03599d59/68747470733a2f2f70726f6772616d6172666163696c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f416e696d6163696f6e5f626c696e6b5f6e6f64656d63755f736d616c6c2e676966)

        Por otro lado, si lo que se hubiera pedido hubiera sido poner a parparear un led, pero en esta ocasión usando el puerto D5 (GPIO14), el código tendria un minimo cambio tal y como se muestra a continuación (Codigo tomado de **Example Sketch: Blink** [[link]](https://learn.sparkfun.com/tutorials/esp8266-thing-hookup-guide/all#example-sketch-blink)):

        ```cpp
        #define ESP8266_LED D5 // D5 = 14
        
        void setup() {
          pinMode(ESP8266_LED, OUTPUT);
        }
        
        void loop() {
          digitalWrite(ESP8266_LED, HIGH);
          delay(500);
          digitalWrite(ESP8266_LED, LOW);
          delay(500);
        }
        ```

        La conexión asociada al codigo anterior se muestra a continuación:

        <Image img={require('/img/sesiones/percepcion/3/esp8266/blink_esp8266_bb.jpg')} />

        **Ejemplo 2**

        Prender el led integrado de la placa NodeMCU cuando se presiona un switch. (Código tomado de **Cómo programar NodeMCU con el IDE de Arduino** [[link]](https://programarfacil.com/esp8266/como-programar-nodemcu-ide-arduino/))

        ```cpp
        #define LED_BUILTIN 2
        #define BUTTON_BUILTIN 0 
        
        void setup() { 
          pinMode(LED_BUILTIN, OUTPUT);
          pinMode(BUTTON_BUILTIN, INPUT);
        } 
        
        void loop() {
          int estado = digitalRead(BUTTON_BUILTIN); 
          digitalWrite(LED_BUILTIN, estado); 
        }
        ```

        La siguiente imagen (tomada de la pagina original) muestra el funcionamiento del codigo anterior una vez este ha sido descargado a la tarjeta.

        ![img](https://camo.githubusercontent.com/e8635173e656d8025a6d7eace892a646333537b3d4485e3a3b512a99b0cad522/68747470733a2f2f70726f6772616d6172666163696c2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f416e696d6163696f6e5f626f746f6e5f6e6f64656d63755f736d616c6c2e676966)

        A continuación se muestra el mismo ejemplo anterior pero en este caso se usan los siguientes puertos:

        |Elemento|Puerto|Componente|
        |---|---|---|
        |Switch|```D6``` (```GPIO12```)|[Grove - Red LED](https://wiki.seeedstudio.com/Grove-Red_LED/)|
        |Led|```D1``` (```GPIO5```)|[Grove - Button](https://wiki.seeedstudio.com/Grove-Button/)|
        
        
        ```cpp
        /* Pin Definitions */
        const int LED_PIN = 5; // D1 = GPIO5
        const int BUTTON_PIN = 12; // D6 = GPIO12
         
        void setup() { 
          pinMode(LED_PIN, OUTPUT);
          pinMode(BUTTON_PIN, INPUT);
        } 
         
        void loop() {
          int estado = digitalRead(BUTTON_PIN); 
          digitalWrite(LED_PIN, estado); 
        }
        ```

        A continuación se muestra la conexión del ejemplo anterior usando los componentes ([Grove - Red LED](https://wiki.seeedstudio.com/Grove-Red_LED/) y [Grove - Button](https://wiki.seeedstudio.com/Grove-Button/)) del kid groove:

        <Image img={require('/img/sesiones/percepcion/3/esp8266/button_esp8266_bb.jpg')} />

        **Ejemplo 3**

        Modifica el brillo de un led (conectado al pin ```D2``` (```GPIO4```)) de manera automatica.
        
        ```cpp
        /* Pin Definitions */
        const int ledPin = D2; // D1 = GPIO4
          
        
        void setup() {
          // nothing happens in setup
        }
        
        void loop() {
        
          for (int fadeValue = 0 ; fadeValue <= 255; fadeValue += 5) {
            analogWrite(ledPin, fadeValue);
            delay(30);
        
          }
        
          for (int fadeValue = 255 ; fadeValue >= 0; fadeValue -= 5) {
            analogWrite(ledPin, fadeValue);
            delay(30);
          }
        }
        ```
        
        A continuación se muestra el diagrama de conexión usando el [Grove - Red LED](https://wiki.seeedstudio.com/Grove-Red_LED/) para el código anterior:

        <Image img={require('/img/sesiones/percepcion/3/esp8266/fading_esp8266_bb.jpg')} />

        **Ejemplo 4**

        En este ejemplo se imprime en el monitor serial una valor de voltaje analogo asociado a un potenciometro:

        ```cpp
        /* Pin Definitions */
        const int ANALOG_PIN = A0; // A0
        
        void setup() {
          Serial.begin(9600);
        }
        
        void loop() {
          int sensorValue = analogRead(ANALOG_PIN);
          Serial.println(sensorValue);
          delay(1);        
        }
        ```
        
        Para este caso, se conecto al pin ```A0``` el [Grove - Rotary Angle Sensor](https://wiki.seeedstudio.com/Grove-Rotary_Angle_Sensor/)
        
        <Image img={require('/img/sesiones/percepcion/3/esp8266/analogReadSerial_esp8266_bb.jpg')} />
        
      </div>
    </details>
    <details>
      <summary>
        **ESP32**
      </summary>
      <div>
      El ESP32 ([ESP32 Series Datasheet](https://cdn.sparkfun.com/datasheets/IoT/esp32_datasheet_en.pdf)) es el sucesor del ESP8266. Este ademas de soportar conectividad Wi-Fi, soporta tambien conectividad Bluetooth (4.2 y Low Energy).
      
      Existen diferentes plataformas de desarrollo ([ESP32 Development Boards Review and Comparison](https://makeradvisor.com/esp32-development-boards-review-comparison/)). En nuestro caso vamos a usar la NodeMCU-32S de Ai-Thinker ([Nodemcu-32s Datasheet](https://docs.ai-thinker.com/_media/esp32/docs/nodemcu-32s_product_specification.pdf))

      **Material requerido**

      1. Tarjeta NodeMCU-32S
      2. Cable USB tipo C.
      3. Grove - Starter Kit v3 ([link](https://wiki.seeedstudio.com/Grove_Starter_Kit_v3/))
      4. Grove Base Shield for NodeMCU V1.0 ([link](https://wiki.seeedstudio.com/Grove_Base_Shield_for_NodeMCU_V1.0/))
   
      **Trabajo previo con fritzing**

      Para realizar prototipado empleando elementos (de diferentes fabricantes) disponibles en kits de desarrollo a trabajar en el laboratorio siga los pasos ilustrados en el tutorial [How to Add Components in Fritzing](https://steemit.com/utopian-io/@thinkingmind/how-to-add-components-in-fritzing) (para comprender bien el procedimiento puede ver el siguiente [video](https://www.youtube.com/watch?v=lEEkYk5IQVY) antes de empezar). Para ello agregar los siguientes componentes:
      1. **ESP32**: Cuya parte ([ESP32S_HiLetgo.fzpz](https://forum.fritzing.org/uploads/default/original/2X/1/1c6c1b0e5bff03730a40b696b354783432fbb506.fzpz)) puede ser decargada de la pagina[ESP32S-HiLetgo Dev Boad with Pinout Template](https://forum.fritzing.org/t/esp32s-hiletgo-dev-boad-with-pinout-template/5357?u=steelgoose). El pinout de esta parte (en fritzing) se muestra en la siguiente imagen:

         <Image img={require('/img/sesiones/percepcion/3/esp32/esp32_fritzing.jpg')} />
   
      2. **Kid  de sensores Elegoo**: Ver link anterior...
   
      **Pinout**

      A continuación se muestra el diagrama de pines:

        <Image img={require('/img/sesiones/percepcion/3/esp32/esp32-devkitC-v4-pinout.png')} />
        
        Mas exactamente para el NodeMCU-32s tiene un total de 38 pines los cuales se resumen en la siguiente figura:
        
        <Image img={require('/img/sesiones/percepcion/3/esp32/nodemcu_32s_pin.png')} />
        
        La siguiente tabla tomada del datasheet, describe cada uno de estos pines:
        
        
        |No. |Pin Name |Functional Description|
        |---|---|---|
        |1 |3.3V | Module power supply pin |
        |2 |EN | Chip Enabled Pin, Active High |
        |3 |SVP | GPIO36，ADC1_CH0，RTC_GPIO0 |
        |4 |SVN | GPIO39，ADC1_CH3，RTC_GPIO3|
        |5 |P34 | GPIO34，ADC1_CH6，RTC_GPIO4|
        |6 |P35 | GPIO35，ADC1_CH7，RTC_GPIO5|
        |7 |P32 | GPIO32, XTAL_32K_P (32.768kHz Crystal input), ADC1_CH4, TOUCH9,RTC_GPIO9 |
        |8 |P33 |GPIO33, XTAL_32K_N (32.768kHz Crystal output),ADC1_CH5, TOUCH8,RTC_GPIO8|
        |9 |P25 |GPIO25，DAC_1，ADC2_CH8，RTC_GPIO6，EMAC_RXD0|
        |10 |P26 |GPIO26，DAC_2，ADC2_CH9，RTC_GPIO7，EMAC_RX_DV|
        |11 |P27 |GPIO27，ADC2_CH7，TOUCH7，RTC_GPIO17，EMAC_RX_DV|
        |12 |P14 |GPIO14, ADC2_CH6, TOUCH6, RTC_GPIO16, MTMS, HSPICLK, HS2_CLK,SD_CLK, EMAC_TXD2|
        |13 |P12 |GPIO12, ADC2_CH5, TOUCH5, RTC_GPIO15, MTDI, HSPIQ, HS2_DATA2,SD_DATA2, EMAC_TXD3|
        |14 |GND |GND|
        |15 |P13 |GPIO13, ADC2_CH4, TOUCH4, RTC_GPIO14, MTCK, HSPID, HS2_DATA3,SD_DATA3, EMAC_RX_ER|
        |16 |SD2 |GPIO9, SD_DATA2, SPIHD, HS1_DATA2, U1RXD|
        |17 |SD3 |GPIO10, SD_DATA3, SPIWP, HS1_DATA3, U1TXD|
        |18 |CMD |GPIO11, SD_CMD, SPICS0, HS1_CMD, U1RTS|
        |19 |5V |Module power supply pin|
        |20 |CLK |GPIO6, SD_CLK, SPICLK, HS1_CLK, U1CTS|
        |21 |SD0 |GPIO7, SD_DATA0, SPIQ, HS1_DATA0, U2RTS|
        |22 |SD1 |GPIO8, SD_DATA1, SPID, HS1_DATA1, U2CTS|
        |23 |P15 |GPIO15, ADC2_CH3, TOUCH3, MTDO, HSPICS0, RTC_GPIO13, HS2_CMD,SD_CMD, EMAC_RXD3|
        |24 |P2 |GPIO2, ADC2_CH2, TOUCH2, RTC_GPIO12, HSPIWP, HS2_DATA0,SD_DATA0|
        |25 |P0 |GPIO0, ADC2_CH1, TOUCH1, CLK_OUT1,RTC_GPIO11, EMAC_TX_CLK; **Download mode: external pull low, running mode: floating or external pull high**|
        |26 |P4 |GPIO4, ADC2_CH0, TOUCH0, RTC_GPIO10, HSPIHD, HS2_DATA1,SD_DATA1, EMAC_TX_ER|
        |27 |P16 |GPIO16, HS1_DATA4, U2RXD, EMAC_CLK_OUT |
        |28 |P17 |GPIO17, HS1_DATA5, U2TXD, EMAC_CLK_OUT_180 |
        |29 |P5 |GPIO5, VSPICS0, HS1_DATA6, EMAC_RX_CLK|
        |30 |P18| GPIO18, VSPICLK, HS1_DATA7|
        |31 |P19| GPIO19, VSPIQ, U0CTS, EMAC_TXD0|
        |32 |GND| GND|
        |33 |P21| GPIO21, VSPIHD, EMAC_TX_EN|
        |34 |RX| GPIO3, U0RXD, CLK_OUT2|
        |35 |TX| GPIO1, U0TXD, CLK_OUT3, EMAC_RXD2|
        |36 |P22| GPIO22, VSPIWP, U0RTS, EMAC_TXD1|
        |37 |P23| GPIO23, VSPID, HS1_STROBE|
        |38 |GND| GND|
        
        Para conocer mas sobre el uso de los pines para esta plataforma se recomienda ver la pagina: [ESP32 Pinout Reference: Which GPIO pins should you use?](https://randomnerdtutorials.com/esp32-pinout-reference-gpios/)

      **Arduino core for the ESP32, ESP32-S2, ESP32-S3 and ESP32-C3**

      De manera similar al ESP8266, el ESP32 puede programarse usando el API arduino. Para mas información puede consultar la documentación de este Core en el siguiente [link](https://docs.espressif.com/projects/arduino-esp32/en/latest/).

        Antes de empezar a usar el core para el esp32s, es necesario instalar las librerias necesarias para ello. Para esto siga las instrucciones que se describen en el link [Installing the ESP32 Board in Arduino IDE (Windows, Mac OS X, Linux)](https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/)
        
        Antes de analizar los ejemplos que se muestran a continuación se recomuenda que de un vistazo al link [Getting Started with the ESP32 Development Board](https://randomnerdtutorials.com/getting-started-with-esp32/) 
      
      Antes de empezar a realizar los ejemplos, se debe seleccionar la tarjeta con la cual se va a trabajar (NodeMCU-32s) tal y como se muestra en la siguiente figura:

      <Image img={require('/img/sesiones/percepcion/3/esp32/seleccion_nodemcu-32s.png')} />

      A continuación se van a mostrar los ejemplos hechos en arduino  adaptados a la plataforma ESP32.

      **Ejemplo 1**

      Poner parpadear un led a un periodo de 2 segundos usando el led de la tarjeta ESP32 (Ejemplo adaptado de: [Blink](https://docs.arduino.cc/built-in-examples/basics/Blink)). 

        ```cpp
        void setup() {
          pinMode(LED_BUILTIN, OUTPUT);
        }
        
        // the loop function runs over and over again forever
        void loop() {
          digitalWrite(LED_BUILTIN, HIGH);   
          delay(1000);                       
          digitalWrite(LED_BUILTIN, LOW);    
          delay(1000);                      
        }
        ```
        
        * **Simulación online ejemplo 1**: [link](https://wokwi.com/projects/335030762714694227)
        
        **Ejemplo 2**
        
        Prender el led integrado de la placa ESP32 cuando se presiona un switch. (Código adaptado para el ESP32 del link [How to Wire and Program a Button](https://docs.arduino.cc/built-in-examples/digital/Button))
        
        
        ```cpp
        const int buttonPin = 5;         //  (GPIO5)
        const int ledPin =  LED_BUILTIN; 
        
        // variables will change:
        int buttonState = 0;         
        
        void setup() {
          pinMode(ledPin, OUTPUT);
          pinMode(buttonPin, INPUT);
        }
        
        void loop() {
          buttonState = digitalRead(buttonPin);
        
          if (buttonState == HIGH) {
            digitalWrite(ledPin, HIGH);
          } else {
            digitalWrite(ledPin, LOW);
          }
        }
        ```
        
        * **Simulación online ejemplo 2**: [link](https://wokwi.com/projects/335034266233602642)
        
        A continuación se muestra el diagrama de conexión para este ejemplo:

        <Image img={require('/img/sesiones/percepcion/3/esp32/esp_ledButton.jpg')} />
        
        Para entender mas se recomienda que mire el tutorial [ESP32 Digital Inputs and Digital Outputs (Arduino IDE)](https://randomnerdtutorials.com/esp32-digital-inputs-outputs-arduino/).
        
        **Ejemplo 3**

        Modifica el brillo de un led (conectado al pin GPIO2) de manera automatica. (Código adaptado para el ESP32 del link [Fading a LED](https://docs.arduino.cc/built-in-examples/basics/Fade))

        ```cpp
        int ledPin = 2;    // GPIO2
        
        void setup() {
          // nothing happens in setup
        }
        
        void loop() {
          for (int fadeValue = 0 ; fadeValue <= 255; fadeValue += 5) {
            analogWrite(ledPin, fadeValue);
            delay(30);
          }
        
          for (int fadeValue = 255 ; fadeValue >= 0; fadeValue -= 5) {
            analogWrite(ledPin, fadeValue);
            delay(30);
          }
        }
        ```
        
        * **Simulación online ejemplo 3**: [link](https://wokwi.com/projects/335030762714694227)
        
        El diagrama de conexión se muestra a continuación:

        <Image img={require('/img/sesiones/percepcion/3/esp32/esp32_Fadding.jpg')} />
        
        Para reforzar los conceptos adquiridos anteriormente ver el enlace [ESP32 PWM with Arduino IDE (Analog Output)](https://randomnerdtutorials.com/esp32-pwm-arduino-ide/).

        **Ejemplo 4**

        Llevar al puerto serial el valor de voltaje de un potenciometro leido a traves del puerto analogo. Adicionalmente empleando una señal PWM, variar el grado de luminosidad del led integrado en la tarjeta ESP32. 

        ```cpp
        const int analogInPin = 15;  //  GPIO15
        const int analogOutPin = LED_BUILTIN; // ESP32 led
        
        int sensorValue = 0;        
        int outputValue = 0;        
        
        void setup() {
          Serial.begin(9600);
        }
        
        void loop() {
          sensorValue = analogRead(analogInPin);
          outputValue = map(sensorValue, 0, 4095, 0, 255); // ADC de 12 bits
          analogWrite(analogOutPin, outputValue);
        
          Serial.print("sensor = ");
          Serial.print(sensorValue);
          Serial.print("\t output = ");
          Serial.println(outputValue);
        
          delay(2);
        }
        ```
        
        * **Simulación online ejemplo 4**: [link](https://wokwi.com/projects/335035080677261908)
                
        El diagrama de conexión se muestra a continuación:

        <Image img={require('/img/sesiones/percepcion/3/esp32/esp32_AnalogInOutSerial.jpg')} />

        Para comprender mejor este ejemplo se recomienda reforzar viendo el link [ESP32 ADC – Read Analog Values with Arduino IDE](https://randomnerdtutorials.com/esp32-adc-analog-read-arduino-ide/).

      </div>
    </details>
  </div>
</details>

A lo largo de lo que resta la capa de percepción nos vamos a enfocar en la placa ESP32 la cual es una de las mas empleadas en la actualidad en proyectos IoT.

## Trabajo de clase

### Primeros pasos con el ESP32

Existen diferentes plataformas basadas en el ESP32 ([link wikipedia](https://en.wikipedia.org/wiki/ESP32)). En el laboratorio del LIS se encuentra la placa **NodeMCU-32s** ([NodeMCU-32 Specification](https://docs.ai-thinker.com/_media/nodemcu32-s_specification_v1.3.pdf)) de la empresa china **ai-thinker** (http://www.ai-thinker.com/). 

![esp_32](/img/sesiones/percepcion/3/nodemcu-32s.png)

Antes de empezar, tenga a la mano, el diagrama de pines del NodeMCU:

<Image img={require('/img/sesiones/percepcion/3/nodemcu_32s_pin.png')} />

Luego, despues de realizar las conexiones de los montajes, realizar los siguientes pasos:

1. Siga los pasos descritos en **Installing the ESP32 Board in Arduino IDE (Windows, Mac OS X, Linux)** ([link](https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/)).
2. Usando la IDE de Arduino, proceder a codificar los ejemplos que se muestran a continuación eligiendo como targeta de desarrollo la **NodeMCU-32s** que es la disponible en el laboratorio:

   <Image img={require('/img/sesiones/percepcion/3/seleccion_nodemcu-32s.png')} />

3. Teniendo en cuenta el montaje realizado, codifique el programa para la plataforma elegida. Como el **ESP32** es compatible con Arduino la documentación se encuentra en **Arduino-ESP32** ([link](https://espressif-docs.readthedocs-hosted.com/projects/arduino-esp32/en/latest/)). 
4. Descargue el programa en la placa:
   
   ![placa_esp32](/img/sesiones/percepcion/3/placa-esp32.png)

:::warning
**Importante**: Tenga en cuenta que antes de empezar la descarga del programa debe presionar el botón boot de la placa del ESP32 y liberarlo cuando salga el mensaje **"Connecting..."** en el IDE de Arduino. (Para más información ver la sección **Troubleshooting** en el siguiente [link](https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/))
:::

## Ejemplo de clase

Una de las aplicaciones mas utilies del puerto serial es que facilita el debug de aplicaciones gracias a que por medio de este se pueden imprimir, en tiempo de ejecución, **mensajes de log** que sirven como verificar el correcto funcionamiento de la logica del programa al usar un programa como el monitor serial o cualquier programa similar.

Es muy comun imprimir variables (que pueden indican el estado o valor de un sensor, mensajes de la aplicación, etc). Suponga que se desea probar el siguiente circuito.

![esp32_debug-serial](/img/sesiones/percepcion/3/esp32_debug-serial.png)

Para lo cual se pide que realice las siguientes actividades:

1. Realice la implementación en Fritzing del circuito.
2. Codificar el siguiente programa (usando el API de arduino) y analizarlo para comprender su funcionamiento. Para facilitar las cosas puede correr una simulación de wokwi (https://wokwi.com) en el siguiente [link](https://wokwi.com/projects/358500354708861953)
   
   **Codigo**: Guarde el programa como **esp32-ejemplo.ino**:

   ```cpp
    /*-------------- Debug --------------*/
      
    // Comentar siguiente linea para no hacer debug serial  
    #define DEBUG 1  
    
    /*-------------- Puertos --------------*/
    
    // Swichtes
    #define SW1 22
    #define SW0 23
    
    // Leds switches
    #define LED_SW1 21
    #define LED_SW0 19
    
    // Leds secuencia
    #define LED_PWM 4
    
    // Potenciometro
    #define POT 2
    
    /*-------------- Variables --------------*/
    int pot_value = 0;   // Valor del potenciometro (0 - 2013)
    int val_pwm = 0;     // Valor del pwm (0 - 255)
    int sw_val1;
    int sw_val0;
    int num_seq; 
    int loop_time = 500;
    
    void setup() {
      // Inicializacion de las entradas
      inicializar_entradas();
      inicializar_salidas();
      // Debug Serial
      #if DEBUG
      Serial.begin(9600);
      Serial.println("Configuración de I/O -> OK");
      #endif
    }
    
    void loop() {
      /* Entrada analoga */
      #if DEBUG
      Serial.println("------------------------------------");
      #endif
      // Lectura de la entrada analoga (Potenciometro)
      pot_value = analogRead(POT);
      // Mapeo y escritura analoga (PWM)  
      val_pwm = map(pot_value, 0 , 4095, 0, 255);
      analogWrite(LED_PWM,val_pwm);
      #if DEBUG
      // --- Mensajes de debug (Variables analogas) --- //
      Serial.print("POT: ");
      Serial.print(pot_value);  
      Serial.print(" - LED (PWM): ");
      Serial.println(val_pwm); 
      #endif
      // Lectura de los switches
      sw_val0 = digitalRead(SW0);  
      sw_val1 = digitalRead(SW1);
      // --- Mensajes de debug (Entradas digitales) --- //
      #if DEBUG
      Serial.print("SW0: ");
      Serial.print(sw_val0);
      Serial.print(" - SW1: ");
      Serial.println(sw_val1);
      #endif
      // Obtencion de la secuencia binaria
      num_seq = obtener_numero_secuencia(sw_val1, sw_val0);  
      #if DEBUG
      // --- Mensajes de debug Opcion --- //
      Serial.print("Opcion: ");
      Serial.println(num_seq, BIN);
      #endif
      // Encendido de los leds
      encender_leds_indicadores(num_seq); 
      delay(loop_time);
    }
    
    void inicializar_entradas() {
      // Inicialice aqui las entradas
      pinMode(SW1, INPUT);
      pinMode(SW0, INPUT);
    }
    
    void inicializar_salidas() {
      // Inicialice aqui las salidas
      pinMode(LED_SW1, OUTPUT);
      pinMode(LED_SW0, OUTPUT);
    }
    
    int obtener_numero_secuencia(int sw1, int sw0) {
      // Obtiene el numero asociado a una combinación de switches
      int number;  
      if ((sw1 == LOW)&&(sw0 == LOW)) {
        number = 0;  
      }
      else if ((sw1 == LOW)&&(sw0 == HIGH)) {
        number = 1;
      }
      else if ((sw1 == HIGH)&&(sw0 == LOW)) {
        number = 2;  
      }
      else {
        number = 3;
      }  
      return number;
    }
    
    void encender_leds_indicadores(int number) {
      // Encendido de luces indicadores  
      switch(number) {
        case 0:
          digitalWrite(LED_SW1,LOW);
          digitalWrite(LED_SW0,LOW);
          break;
        case 1:
          digitalWrite(LED_SW1,LOW);
          digitalWrite(LED_SW0,HIGH);
          break;
        case 2:
          digitalWrite(LED_SW1,HIGH);
          digitalWrite(LED_SW0,LOW);
          break;
        default:
          digitalWrite(LED_SW1,HIGH);
          digitalWrite(LED_SW0,HIGH);
      }
    }
    ```

### Circuitos a montar

Para los siguientes circuitos realizar lo siguiente:
1. Hacer el diagrama en fritzing de cada uno de los montajes y subalos a la correspondiente carpeta. Use los módulos del **37 Sensor Kit** (de Elegoo o de Landzo).
2. Realice el montaje en fisico, codifique el programa (entendiendolo obviamente) y muestre su funcionamiento.

**Circuito 1**: Parpadeo de un led ([link](https://wokwi.com/projects/357845157032899585))

* **Montaje**:
  
  ![esp32-1](/img/sesiones/percepcion/3/montaje1.png)


* **Código**: esp32-ej1.ino
  
  ```cpp
  void setup() {
    pinMode(LED_BUILTIN, OUTPUT);
  }
  void loop() {
    digitalWrite(LED_BUILTIN, HIGH);   
    delay(1000);                       
    digitalWrite(LED_BUILTIN, LOW);    
    delay(1000);                      
  }
  ```

**Circuito 2**: Lectura de una señal digital ([link](https://wokwi.com/projects/335034266233602642))

* **Montaje**:
  
  ![esp32-12](/img/sesiones/percepcion/3/montaje2.png)


* **Código**: esp32-ej2.ino

    ```cpp
    #define LED_BUILTIN 2
    
    const int buttonPin = 5;         //  (GPIO5 - D5)
    const int ledPin =  LED_BUILTIN; 
    
    // variables will change:
    int buttonState = 0;         
    
    void setup() {
      pinMode(ledPin, OUTPUT);
      pinMode(buttonPin, INPUT);
    }
    
    void loop() {
      buttonState = digitalRead(buttonPin);
    
      if (buttonState == HIGH) {
        digitalWrite(ledPin, HIGH);
      } else {
        digitalWrite(ledPin, LOW);
      }
    }
    ```

**Circuito 3**: Manejo de una señal PWM ([link](https://wokwi.com/projects/335030762714694227))

* **Montaje**:
  
  ![esp32-3](/img/sesiones/percepcion/3/montaje3.png)


* **Código**: esp32-ej3.ino

    ```cpp
    int ledPin = 2;    // GPIO2
    
    void setup() {
      // nothing happens in setup
    }
    
    void loop() {
      for (int fadeValue = 0 ; fadeValue <= 255; fadeValue += 5) {
        analogWrite(ledPin, fadeValue);
        delay(30);
      }
    
      for (int fadeValue = 255 ; fadeValue >= 0; fadeValue -= 5) {
        analogWrite(ledPin, fadeValue);
        delay(30);
      }
    }
    ```

**Circuito 4**: Lectura de una entrada Análoga ([link](https://wokwi.com/projects/335035080677261908)).

* **Montaje**:
  
  ![esp32-4](/img/sesiones/percepcion/3/montaje4.png)


* **Código**: esp32-ej4.ino

    ```cpp
    const int analogInPin = 15;  //  GPIO15
    const int analogOutPin = LED_BUILTIN; // ESP32 led
    
    int sensorValue = 0;        
    int outputValue = 0;        
    
    void setup() {
      Serial.begin(9600);
    }
    
    void loop() {
      sensorValue = analogRead(analogInPin);
      outputValue = map(sensorValue, 0, 4095, 0, 255); // ADC de 12 bits
      analogWrite(analogOutPin, outputValue);
    
      Serial.print("sensor = ");
      Serial.print(sensorValue);
      Serial.print("\t output = ");
      Serial.println(outputValue);
    
      delay(2);
    }
    ```

:::tip
**Para profundizar**: Para ver mas cosas de lo que se puede realizar con la ESP32 puede consultar dentro de la pagia de **randomnerdtutorials** el link **160+ ESP32 Projects, Tutorials and Guides with Arduino IDE** ([link](https://randomnerdtutorials.com/projects-esp32/))
:::

## Referencias

Para ir mas alla puede consultar las siguientes referencias:
* http://www.ee.ic.ac.uk/pcheung/teaching/DE1_EE/Lectures/
* https://randomnerdtutorials.com/projects-esp32/
* https://esphome.io/components/esp32.html
* https://www.espressif.com/en
* https://docs.ai-thinker.com/en/welcome
* https://docs.platformio.org/en/latest/boards/espressif32/nodemcu-32s2.html
* https://reference.arduino.cc/reference/en/libraries/esp32-control/
* https://www3.ntu.edu.sg/home/ehchua/programming/arduino/arduino.html
* https://www3.ntu.edu.sg/home/ehchua/programming/index.html
* https://fab.cba.mit.edu/classes/863.16/
* https://blob.tomerweller.com/
