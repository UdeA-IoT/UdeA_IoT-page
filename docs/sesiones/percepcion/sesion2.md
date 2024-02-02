---
sidebar_label: 'Sesión 2'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

# Capa de percepción - Sesión 2

:::note[**Objetivos**]
* Comprender los conceptos básicos para realizar prototipado.
* Explorar algunos de los sensores disponibles en el laboratorio
:::

## Introducción

El uso de sensores y actuadores permiten que las cosas interactuen con el mundo real. En esta sesión vamos a explorar los principales conceptos relacionados con los sensores y actuadores analizando una serie de ejemplos que demuestren su uso básico. Antes de comenzar esta sesión se recomienda que revise el siguiente material para contextualizarse:
1. Presentaciones **Interact with the phisycal world** ([lección 3](https://github.com/microsoft/IoT-For-Beginners/blob/main/slides/lesson-3.pdf)) del curso **IoT for Beginners** ([link](https://github.com/microsoft/IoT-For-Beginners)) de Microsoft.
   
   <Image img={require('/img/sesiones/percepcion/2/interaccion_ambiente.png')} />

2. Material teorico del curso disponible en **Poner enlace**

## Componentes del laboratorio

En el laboratorio hay un gran numero de elementos para prototipado. En la siguiente tabla describe los elementos de hardware que usaremos en este laboratorio:



<details>
  <summary>**Elementos a emplear**</summary>
  <div>
    A continuación se describen los principales elementos que se usaran a lo largo del curso
    <details>
      <summary>
        **Sistemas de desarrollo**
      </summary>
      <div>
        |Elemento|Descripción|
        |--|--|
        |Arduino Uno|Placa de desarrollo Arduino Uno ([link](https://docs.arduino.cc/hardware/uno-rev3))|
        |Tarjeta de desarrollo ESP8266 NodeMCU WiFi Devkit|Tarjeta de desarrollo basada en ESP8266 (poner link)|
        |Tarjeta de desarrollo NodeMCU-32S| Tarjeda de desarrollo basada en el ESP-32S (poner link)
        |Arduino Nano 33 BLE Sense ***Lite***|Tarjeta de desarrollo Arduino Nano 33 BLE Sense ***Lite*** ([link](https://docs.arduino.cc/hardware/nano-33-ble-sense)). **Importante**: Tenga en cuenta la información dada en el siguiente [foro](https://forum.arduino.cc/t/a-difference-between-a-n-33-ble-sense-vs-sense-lite/1030305/3) |
      </div>
    </details>
    <details>
      <summary>
        **Kit de sensores**
      </summary>
      <div>
        |Elemento|Descripción|
        |--|--|
        |Grove - Starter Kit v3|Kit de desarrollo para prototipado rapido ([link](https://wiki.seeedstudio.com/Grove_Starter_Kit_v3/))|
        |37 sensor kit Elegoo| Kit de sensores Elegoo para prototipado rapido ([link](http://spot.pcc.edu/~dgoldman/labs/37SENSORKIT.pdf))|
        |AlphaBot2 robot building kit for Arduino/Pi/PiZero| Kit para prototipado de robots AlphaBot2 ([link](https://www.waveshare.com/wiki/AlphaBot2))|
        |Landzo 37 In 1 Sensors Kit For Arduino|Kit de sensores Landzo para prototipado ([link](https://www.instructables.com/Arduino-37-in-1-Sensors-Kit-Explained/))
        |Tiny Machine Learning Kit|Tiny Machine Learning Kit [[Manual de usuario]](https://tinyml.seas.harvard.edu/assets/other/4D/22.03.11_Marcelo_Rovai_Handout.pdf) [[link1]](https://store-usa.arduino.cc/products/arduino-tiny-machine-learning-kit?queryID=undefined&selectedStore=us) [[link2]](https://www.farnell.com/datasheets/3295973.pdf)|
      </div>
    </details>
  </div>
</details>

## Mapa de pines (pinout)


<details>
  <summary>**Placas de desarrollo**</summary>
  <div>
    A continuación se describen los principales elementos que se usaran a lo largo del curso
    <details>
      <summary>
        **Arduino UNO**
      </summary>
      <div>
        La placa Arduino UNO es una plataforma de código abierto basada en el microcontrolador ATmega328P cuya alimentación es a 5V (cuando la alimentación es por USB) o en un voltaje DC entre 7 - 12 V cuando la alimentación es a traves del conector jack.

        Antes de empezar a trabajar con cualquier plataforma de desarrollo es necesario conocer como mínimo el mapa de pines de esta. A continuación, se muestra el mapa de pines para la tarjeta Arduino UNO ([link](https://store-usa.arduino.cc/products/arduino-uno-rev3))

        
        <Image img={require('/img/sesiones/percepcion/2/arduino_uno-pines.png')} />

        La siguiente tabla resume la información del mapa de pines para el Arduino UNO:

        Para mayor información sobre la placa puede consultar el enlace **Arduino Uno Board Anatomy** ([link](https://docs.arduino.cc/tutorials/uno-rev3/board-anatomy)) . La siguiente tabla resume la información sobre los pines para esta placa:

        |Tipo|Notación pines (placa)|
        |---|---|
        |Digital/GPIO|```D0```, ```D1```, ```D2```, ```~D3```, ```D4```, ```~D5```, ```~D6```, ```D7```, ```D8```, ```~D9```|
        |Analog in|```A0```, ```A1```, ```A2```, ```A3```, ```A4```, ```A5```|
        |PWM|```~D3```, ```~D5```, ```~D6```, ```~D9```, ```~D10```, ```~D11```|
        |Serial (UART)|```Tx->```, ```Rx<-```|
        |I2C|```A4/SDA```, ```A5/SCL```|
        |Digital SPI|```~D10/SS```, ```~D11/MOSI```, ```D12/MISO```, ```D13/SCK```|
        |Interrupt|```D1/INT0```, ```D3/INT1```|

      </div>
    </details>
    <details>
      <summary>
        **ESP32**
      </summary>
      <div>
        Un sistema de desarrollo ESP32 (por ejemplo el NodeMCU-32S) esta basado en el microcontrolador ESP32 el cual cuenta con funcionalidad Wi-Fi y Bluetooth. La tarjeta de desarrollo opera a 3.3 V y es alimentada a traves de una conexión micro-USB de 5 V o directamente a 3.3 V a traves del pin VIN. Cuando se usa esta tarjeta de desarrollo es importante tener en cuenta que los pines GPIO no son tolerantes a 5 V, y la maxima corriente que pueden suministrar es de 12 mA.

        La siguiente figura muestra el diagrama de pines asociado a la tarjeta de desarrollo Nodemcu-32s WIFI MODULE ([link](https://docs.ai-thinker.com/_media/esp32/docs/nodemcu-32s_product_specification.pdf))

        <Image img={require('/img/sesiones/percepcion/2/nodemcu-esp_32s-pines.jpg')} />

        Tal y como se muestra en la siguiente figura, el modulo Nodemcu-32s tiene un total de 38 puertos:
        
        <Image img={require('/img/sesiones/percepcion/2/nodemcu_32s_pines.png')} />

                
        La siguiente tabla resume la función principal algunos de estos:
        
        |Tipo|Notación pines (placa)|
        |---|---|
        |Digital (Only input)|```P34 [GPIO34]```, ```P35 [GPIO35]```, ```SVP [GPIO36]```, ```SVN [GPIO39]```|
        |Analog in|```SVP [GPIO36]```, ```SVN [GPIO39]```, ```P35 [GPIO 35]```, ```P34 [GPIO34]```, ```P32 [GPIO32]```, ```P33 [GPIO 33]```, ```P25 [GPIO25]```, ```P26 [GPIO26]```, ```P27 [GPIO27]```, ```P14 [GPIO14]```, ```P12 [GPIO12]```,  ```P13 [GPIO13]```, ```P15 [GPIO15]```, ```P2 [GPIO2]```, ```P0 [GPIO0]```, ```P4 [GPIO4]```|
        |PWM|```SVP [GPIO36]```, ```SVN [GPIO39]```, ```P35 [GPIO 35]```, ```P34 [GPIO 34]```, ```P32 [GPIO 32]```, ```P33 [GPIO 33]```, ```P25 [GPIO25]```, ```P26 [GPIO26]```, ```P27 [GPIO27]```, ```P14 [GPIO14]```, ```P12 [GPIO12]```,  ```P13 [GPIO13]```, ```P15 [GPIO15]```, ```P2 [GPIO2]```, ```P0 [GPIO0]```, ```P4 [GPIO4]```|
        |Serial (UART)|```Tx [GPI1]```, ```Rx [GPI3]```, ```D8 [TXD2]```, ```D7 [RXD2]```|
        |I2C|```P22 [GPI22/SCL]```, ```P21 [GPI21/SDA]```|
        |Digital SPI|```P23 [MOSI]```, ```P19 [MISO]```, ```P18 [SCK]```, ```P5 [SS]```|
        |Flash SPI|```CLK [GPIO6/FLASHCLK]```, ```SD0 [GPIO7/FLASHD0]```, ```SD1 [GPIO7/FLASHD1]```, ```CMD [GPIO7/FLASHCMD]```, ```SD2 [GPIO9/FLASHD2]```, ```SD3 [GPIO9/FLASHD3]```|
        |Capacitive touch|```P0 [GPIO4]/TOUCH1```, ``` P4 [GPIO0]/TOUCH0```, ``` P2 [GPIO2/TOUCH2]```, ``` P15 [GPIO15/TOUCH3]```, ``` P13 [GPIO13/TOUCH4]```, ``` P12 [GPIO12/TOUCH5]```, ``` P14 [GPIO14/TOUCH6]```, ``` P27 [GPIO7/TOUCH7]```|
        
      </div>
    </details>
    <details>
      <summary>
        **Arduino Nano 33 BLE Sense**
      </summary>
      <div>
      En construcción... [datasheet](https://docs.arduino.cc/resources/datasheets/ABX00031-datasheet.pdf)

    <Image img={require('/img/sesiones/percepcion/2/arduino_nano33-pin.png')} />
    
    La siguiente tabla resume la función principal algunos de los pines de la placa Arduino Nano 33 BLE Sense:
    
    |Tipo|Notación pines (placa)|
    |---|---|
    |Digital/GPIO|```~D2```, ```~D3```, ```~D4```, ```~D5```, ```~D6```, ```~D7```, ```~D8```, ```~D9```, ```~D10```, ```~D11```, ```~D12```, ```~D13```|
    |Analog in|```A0```, ```A1```, ```A2```, ```A3```, ```A4```, ```A5```, ```A6```, ```A7```|
    |PWM|```~D2```, ```~D3```, ```~D4```, ```~D5```, ```~D6```, ```~D7```, ```~D8```, ```~D9```, ```~D10```, ```~D11```, ```~D12```, ```~D13```|
    |Serial (UART)|```Tx```, ```Rx```|
    |I2C|```A4/SDA```, ```A5/SCL```|
    |Digital SPI|```~D11/MOSI```, ```D12/MISO```|
    |Interrupt|Todos los pines digitales|

      </div>
    </details>
  </div>
</details>

## Prototipado básico usando fritzing

Fritzing es una plataforma para plataforma permitira prototipar hardware en su computador y verificar su funcionamiento antes de hacer el montaje en fisico. Esta puede ser descargada del siguiente [link](https://fritzing.org/).

Para realizar prototipado empleando elementos (de diferentes fabricantes) disponibles en kits de desarrollo puede seguir cualquiera de los dos enlaces que se muestran a continuación: 
1. **How to Add Components in Fritzing** ([link](https://steemit.com/utopian-io/@thinkingmind/how-to-add-components-in-fritzing)) 
2. **Fritzing** ([link](https://chem.libretexts.org/Courses/University_of_Arkansas_Little_Rock/IOST_Library/07%3A_Electronics_Book/01%3A_Electric_Fundamentals/05%3A_Fritzing))

La siguiente tabla muestra enlaces de algunos fabricantes que poseen librerias en fritzing:

|Fabricante|Información|Repositorio|Link descarga|
|----|----|----|----|
|Adafruit|<li>**Using the Adafruit Library with Fritzing** ([link](https://learn.adafruit.com/using-the-adafruit-library-with-fritzing))</li>|https://github.com/adafruit/Fritzing-Library|[descarga](https://github.com/adafruit/Fritzing-Library/archive/master.zip)|
|Sparkfun|<li>**Make Your Own Fritzing Parts** ([link](https://learn.sparkfun.com/tutorials/make-your-own-fritzing-parts)) </li> <li> **Fritzing!** ([link](https://www.sparkfun.com/news/663))</li>|https://github.com/sparkfun/Fritzing_Parts||
|Seeed Studio||https://github.com/Seeed-Studio/fritzing_parts|[seeed_fritzing_parts.fzbz](https://github.com/Seeed-Studio/fritzing_parts/blob/master/seeed_fritzing_parts.fzbz)|
|Elegoo||https://github.com/marcinwisniowski/ElegooFritzingBin|[Elegoo-0.6.3.fzbz](https://github.com/marcinwisniowski/ElegooFritzingBin/releases/download/0.6.3/Elegoo-0.6.3.fzbz)|
|NodeMCU y otros componentes||https://github.com/AchimPieters/Fritzing-Custom-Parts|[](https://github.com/AchimPieters/Fritzing-Custom-Parts/releases/download/0.0.4/Fritzing.parts.rar)|
|ESP32 NodeMCU|<li>**ESP32S-HiLetgo Dev Boad with Pinout Template** ([link](https://forum.fritzing.org/t/esp32s-hiletgo-dev-boad-with-pinout-template/5357))</li>||[ESP32S_HiLetgo.fzpz](https://forum.fritzing.org/uploads/default/original/2X/1/1c6c1b0e5bff03730a40b696b354783432fbb506.fzpz)|
|Arduino Nano|<li>**Arduino Nano 33 BLE Sense** ([link](https://store-usa.arduino.cc/products/arduino-nano-33-ble-sense))</li>||[Arduino Nano 33 BLE Sense.fzpz](https://content.arduino.cc/assets/Arduino%20Nano%2033%20BLE%20Sense.fzpz)|

## Actividad de laboratorio

A continuación, se muestra una lista de proyectos con sus respectivos enlaces:

|#|Proyecto|Link|Equipo|
|---|---|---|---|
|1|Ultrasonic Security System|https://projecthub.arduino.cc/Krepak/ultrasonic-security-system-a6ea3a||
|2|Arduino Calculator|https://projecthub.arduino.cc/123samridhgarg/arduino-calculator-bce0df||
|3|Arduino Solar Tracker|https://projecthub.arduino.cc/Aboubakr_Elhammoumi/arduino-solar-tracker-77347b||
|4|Line Following Robot|https://projecthub.arduino.cc/lightthedreams/line-following-robot-34b1d3||

Teniendo en cuenta lo anterior:
1. Cada equipo debera elegir uno de los proyectos y actualizar la columna de tabla anterior con los nombres de los integrantes.
2. Dentro de la carpeta asociada a cada equipo hay una plantilla (archivo **README.md**) la cual debera ser modificado por cada equipo teniendo en cuenta el proyecto elegido.
3. Hacer el diagrama en fritzing y subirlo en la respectiva carpeta.
4. Revisar los siguientes sitios y elegir minimo tres proyectos que le puedan servir como base para el desarrollo de su proyecto IoT.
   * https://www.sparkfun.com
   * https://www.hackster.io
   * https://randomnerdtutorials.com
   * https://projecthub.arduino.cc/
   * https://www.adafruit.com/
   * https://hackaday.com/
   * https://www.seeedstudio.com/
   * https://www.luisllamas.es/
   * https://ubidots.com/
   * https://www.wildernesslabs.co/

## Para profundizar

Para profundizar un poco mas en la teoria sobre algunos de los diferentes tipos de sensores, en la siguiente tabla se muestra una lista de compenentes electronicos importantes:

|Elemento|Tutorial|
|--|--|
|Resistencias|[Resistors](https://learn.sparkfun.com/tutorials/resistors)|
|Leds|[Light-Emitting Diodes (LEDs)](https://learn.sparkfun.com/tutorials/light-emitting-diodes-leds?_ga=2.225295578.159243291.1638157468-812475524.1634861735)|
|Potenciometros|[Voltage Dividers](https://learn.sparkfun.com/tutorials/voltage-dividers)|
|Capacitores|[Capacitors](https://learn.sparkfun.com/tutorials/capacitors)|
|Diodos|[Diodes](https://learn.sparkfun.com/tutorials/diodes)|
|Transistores|[Transistors](https://learn.sparkfun.com/tutorials/transistors)|
|Motores|[Motors and Selecting the Right One](https://learn.sparkfun.com/tutorials/motors-and-selecting-the-right-one)|
|Display LCD|[Basic Character LCD Hookup Guide](https://learn.sparkfun.com/tutorials/basic-character-lcd-hookup-guide?_ga=2.57652842.159243291.1638157468-812475524.1634861735)|
|Acelerometro|[Accelerometer Basics](https://learn.sparkfun.com/tutorials/accelerometer-basics)|
|Led Infrarrojo|[IR Communication](https://learn.sparkfun.com/tutorials/ir-communication)|
|Sensor de humedad|[Soil Moisture Sensor Hookup Guide](https://learn.sparkfun.com/tutorials/soil-moisture-sensor-hookup-guide?_ga=2.70021712.159243291.1638157468-812475524.1634861735)|
|Giroscopo|[Gyroscope](https://learn.sparkfun.com/tutorials/gyroscope)|
|Joystick|[Thumb Joystick Hookup Guide](https://learn.sparkfun.com/tutorials/thumb-joystick-hookup-guide?_ga=2.67418961.159243291.1638157468-812475524.1634861735)|
|Cables|[Working with Wire](https://learn.sparkfun.com/tutorials/working-with-wire?_ga=2.225295578.159243291.1638157468-812475524.1634861735)|
|Fotocelda|[Photocell Hookup Guide](https://learn.sparkfun.com/tutorials/photocell-hookup-guide?_ga=2.225295578.159243291.1638157468-812475524.1634861735)|
|Servomotores|[Hobby Servo Tutorial](https://learn.sparkfun.com/tutorials/hobby-servo-tutorial?_ga=2.57505002.159243291.1638157468-812475524.1634861735)|
|Baterias|[Battery Technologies](https://learn.sparkfun.com/tutorials/battery-technologies)|
|Sensor de temperatura|[DHT11, DHT22 and AM2302 Sensors](https://learn.adafruit.com/dht)|
|Sensor de ultrasonido|[Ultrasonic Sonar Distance Sensors](https://learn.adafruit.com/ultrasonic-sonar-distance-sensors)|
|Sensor de proximidad|[PIR Motion Sensor](https://learn.adafruit.com/pir-passive-infrared-proximity-motion-sensor)|


## Referencias

* https://github.com/UdeA-IoT/actividad-4
* https://randomnerdtutorials.com/
* https://hci.rwth-aachen.de/arduino
* https://cdn.sparkfun.com/assets/7/2/a/4/f/SerLCDReactionTimerActivity.pdf
* https://www.bildr.com/
* https://github.com/UdeA-IoT/iot-2022_1/tree/main/percepcion/sesion1/esp32
* https://github.com/UdeA-IoT/actividad-4
* https://www3.gobiernodecanarias.org/medusa/ecoescuela/recursosdigitales/2015/02/10/diseno-electronico-con-fritzing/
* https://fritzing.org/media/uploads/learning/translations/Fritzing-PrimerosPasos.pdf
* https://fritzing.org/learning/
* https://arxiv.org/ftp/arxiv/papers/2206/2206.07146.pdf
* https://chem.libretexts.org/Courses/University_of_Arkansas_Little_Rock/IOST_Library/07%3A_Electronics_Book
* https://www.instructables.com/Fritzing-A-Tutorial/
* https://forum.fritzing.org/t/fritzing-part-of-an-esp32/5355/5
* https://www.studiopieters.nl/homekit-accessoires/
* https://en.wikipedia.org/wiki/Open-design_movement
* https://www.embedded.com/serial-protocols-compared/
* https://circuitdigest.com/tutorial/serial-communication-protocols
* https://www.totalphase.com/blog/2017/08/serial-communication-protocols-the-basics/
* https://www.linkedin.com/pulse/communication-protocols-embedded-system-keroloes-girgis
* https://www.weare5vmedia.com/media/communication-protocols-for-an-embedded-engineer-to-know
* https://embeddedsecurity.io/protocols
* https://resources.altium.com/p/comparing-all-serial-communications-protocols
* https://wiki.seeedstudio.com/Name_your_website/
* https://www.sparkfun.com/news/1529
* https://learn.sparkfun.com/tutorials/using-github-to-share-with-sparkfun
* https://learn.sparkfun.com/tutorials/using-github
* https://makeabilitylab.github.io/physcomp/
* https://vimeo.com/channels/pcomp
* https://web.stanford.edu/class/archive/engr/engr40m.1178/
* https://docs.arduino.cc/tutorials/nano-33-ble-sense/get-started-with-machine-learning
* https://dotnet.microsoft.com/en-us/learn/iot
* https://github.com/MicrosoftDocs/dotnet-iot-assets/tree/main
* https://github.com/noopkat/iotcore-smart-device
* https://store-usa.arduino.cc/collections/internet-of-things
* https://www.wildernesslabs.co/

