---
title: Clasificación
---

# Clasificacion de los sensores

## Clasificación de acuerdo al tipo de variable medida

Existen diferentes tipos de sensores que permiten medir diferentes variables, desde propiedades naturales tales como la temperatura del aire a interacciones fisicas como el movimiento.
Algunos tipos de sensores existentes son:
* **Sensores de temperatura**: Permiten medir la temperatura del aire o el medio en el cual se encuentran inmersos. A veces suelen venir cominados con sensores de humedad y presión en un mismo modulo.
* **Botones**: Permiten sensar cuando estos son presionados.
* **Sensores de luz**: Estos detectan niveles de luz. Tambien permiten medir distintos tipos de luz (de colores especificos, ultravioleta, infraroja o luz visible en general).
* **Acelerometros**: Permiten medir el movimiento en multiples direcciones.
* Microfonos: estos permiten detectar sonidos.

La siguiente tabla muestra una lista mas amplia de algunos tipos de sensores:

![tipos_sensores](/img/sensores/tipos-sensores_monk.jpg)

## Clasificación de acuerdo al tipo de señal

De acuerdo al tipo de señal entregada, los sensores se pueden clasificar en dos tipos basicos:
* Sensores Analógicos
* Sensores Digitales

### Sensores Analógicos

Son el tipo de sensores mas basicos que existen. Estos sensores son alimentados con voltaje (voltaje de alimentación) desde el dispositivo IoT y devolvuelven a este para su lectura, un voltaje cuya variación depende de la variable medida. 

![sensor_analogo](/img/sensores/potentiometer.png)

Debido a que los dispositivos IoT son digitales, los valores obtenidos al usar sensores analogos deben ser convertidos a una señal digital antes de ser procesados de modo que muchos dispositivos IoT tienen **Conversores analogo a digital (ADCs)** para convertir señales analogas a representaciones digitales de su valor. En caso de que el dispositivo no tenga **ADCs**, estos pueden ser conectados al dispositivo como un modulo exterior (Como el caso de la rPi).

Cuando un sensor esta conectado a un dispositivo IoT, el valor analogo leido debe ser convertido a una representación digital la cual depende del rango de variación de la señal analoga de entrada y del tipo de dispositivo. El rango de valores de un **ADC** depende del numero de bits de resolución, por ejemplo, si un **ADC** es de 10 bits, el rango de valores estara entre 0-1023.

### Sensores Digitales

Los sensores digitales detectan cambios de voltaje que solo pueden tomar dos posibles valores (alto y bajo). El tipo mas simple de sensor de este tipo es un **boton** o **switch**, el cual es un sensor con dos estados **ON** y **OFF**.

![sensor_digital](/img/sensores/button.png)

Existen sensores digitales **mas avanzados** que tienen la capacidad de sensar variables analógicas gracias a que possen el hardware necesario para poder procesar la señal leida de modo tal, que pueden ser conectados directamente al dispositivo IoT. Un caso tipico de estos, consiste en los sensores de temperatura que vienen integrados con un **ADC** de modo que los valores analogos leidos son convertidos en señales digitales que se envian al dispositivo IoT como datos. 

Enviar datos en forma digital permite que los sensores sean mas complejos y que envien datos mas detallados, incluso encriptados si la seguridad es importante, un sensor de este tipo lo constituye una camara, la cual captura una imagen y envia los datos de esta al dispositivo IoT empleando un formato digital comprimido como el JPEG.

![sensor_digital_inteligente](/img/sensores/temperature-as-digital.png)

