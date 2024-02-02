# Sensores

## Definición

Un sensor es un tipo de transductor cuya función consiste transformar las señales del entorno (señales fisicas) en señales electricas las cuales son necesarias para poder ser procesadas por el sistema. Existen sensores para medir diferentes variables fisicas, quimicas e incluso biologicas como intensidad lumínica, temperatura, distancia o la aceleración entre otros. La siguiente figura ilustra lo anterior descrito:

![sensing](/img/sensores/sensing.png)

Para la selección de un sensor las condiciones de trabajo, alimentación, exactitud, repetibilidad y tiempo de respouesta son tomadas en cuenta. Para consultar consultar estas y otras caracteristicas se recurre a la hoja de datos del sensor (datasheet).

:::tip
Para saber mas como leer un datasheet le recomendamos que de un vistazo a la pagina **How to Read a Datasheet** [[link]](https://www.sparkfun.com/tutorials/223)
:::

## Caracteristicas de los sensores

Para describir las caracteristicas de un sensor se usan varios terminos para cuantificar sus caracteristicas y desempeño. A continuación se trata esta terminologia.

### Rango

El **rango** se define como los valores maximo y mininimo para los cuales el sensor esta diseñado para medir. A patir de este se puede encontrar el **alcance (spam)** el cual consiste en la diferencia entre los valores extremos del rango. 

### Resolución

Es el minimo cambio en la medida que puede ser percibido por el sensor. Este se suele expresar como un porcentaje del rango del dispositivo.

### Error

Es la diferencia entre un valor medido y su valor real. En otras palabras:

$$
ERROR = valor_{leido} - valor_{esperado}
$$

Los errores se pueden dividir entre dos clases:
* **Errores aleatorios (Random Errors)**: Estos errores son aquellos que producen dispersión en lecturas repetitas. Los efectos debido a estos se pueden medir comparando multiples lecturas y anotando la candidad de dispersión presente. El efecto de este tipo de errores tambien puede ser reducido tomando el promedio de lecturas repetidas.
* **Errores Sistematicos (Systematic errors)**: Son errores debidos a la mala calibracion de los instrumentos de medición. Estos errores no pueden medidos ni reducidos por medio multiples lecturas.

### Exacitud (Accuracy)

El termino **exactitud** (**accuracy**) describe el maximo error esperado asociado con una medición (o sensor) y puede ser expresado como un valor absoluro o un porcentaje del rango del sistema. Por ejemplo la exactitud de un sensor de velocidad de un vehiculo podria darse como ±1 mph o ±0.5% de la lectura en escala completa. A veces se suele emplear el termino **inexactitud** (**innaccuracy**) ya que estrictamente hablando lo que se esta mostrando es la **inexactitud**.

### Precisión

La **precisión** (**precision**) es la cualidad de un instrumento por la que tiende a dar lecturas muy próximas unas a otras, es decir, es el grado de dispersión de las mismas. Cuando un dispositivo tiene alta precisión, producirá lecturas repetidas con muy poca dispersión. Es importante aclarar que esta se suele confundir a veces con la **exactitud**; de hecho, un dispositivo puede se muy preciso pero poco exacto.

![exactitud_precisio](/img/sensores/exactitud_precision.png)

Los instrumentos de medida estan diseñados por los fabricantes para que sean precisos, sin embargo, como periódicamente se descalibran, deben reajustarse para que sean exactos. Es importante señalar que el término precisión es sinónimo de **repetibilidad**.

### Sensibilidad (Sensitivity)

Esta es una medida del cambio producido a la salida cuando se da un cambio en la variable medida (entrada). Un sensor que tenga alta sensibilidad producira un gran cambio a la salida cuando se da un cambio en la entrada. Las unidades de esta medida reflejan la naturaleza de la cantidad medida. Por ejemplo, para un sensor de temperatura, la sensibilidad podría ser de 10 mV/°C, lo que significa que la salida cambiaría 10 mV por cada cambio de temperatura de 1 °C.

### Linealidad 

En la mayoría de las situaciones, es conveniente tener un sensor donde la salida sea tenga una relación lineal con la cantidad medida. En la práctica, los sensores reales tendrán cierta no linealidad, que se define como la desviación máxima de cualquier lectura de esta línea recta (asociada al caso ideal). La no linealidad normalmente se expresa como un porcentaje del valor de escala completa.

![linealidad](/img/sensores/linealidad.png)

:::tip
Es importante tener en cuenta estos (y otros) aspectos al realizar la elección del sensor de tal modo que este sea el apropiado para las necesidades de la implementación a realizar. 
:::

### Ejemplo

Teniendo en cuenta los conceptos vistos previamente, analicemos dos sensores disponibles en el mercado:

#### Sensor de temperatura y humedad DHT22

![dht22](/img/sensores/dht22.png)

Este es un sensor para medir de la temperatura y la humedad ([datasheet](https://www.sparkfun.com/datasheets/Sensors/Temperature/DHT22.pdf)). Generalmente, en las especificaciones tecnicas dadas en el datasheet se describe toda la información relevante asociada al sensor, la tabla mostrada a continuación, replica la información (tomada del datasheet) mas relevante:

|Caracteristiva|Valor|
|---|---|
|Power supply|3.3-6V DC|
|Output signal|digital signal via single-bus (One wire protocol)|
|Temperature range|$−40\;to\;80\;°C$|
|Humidity range|$0\;to\;100\%\;RH$|
|Temperature Accuracy|$\pm5 °C$|
|Humidity Accuracy|$\pm2\%\;RH\;(Max:\;\pm5\%\;RH)$|
|Temperature Resolution|$0.1\;°C$|
|Humidity Resolutión|$0.1\%\;RH$|
|Temperature Repeatability|$\pm0.2\;°C$|
|Humidity Repeatability|$\pm0.1\%\;RH$|
|Sensing period|2 seconds|

#### Sensor de distancia por ultrasonido  HC-SR04

Al consultar el datasheet ([link](https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf)) se resumieron las principales caracteristicas de este en la siguiente tabla:

|Caracteristiva|Valor|
|---|---|
|Working Voltage|5V DC|
|Working Current|15mA|
|Working Frequency|40 Hz|
|Max Range|4 m|
|Min Range|2 cm|
|Ranging Accuracy|$\pm3\;mm$|
|Accuracy|$0.1\;°C$|
|Measuring Angle|10us TTL Pulse|
|Echo Output Signal|Input TTL lever signal and the range in proportion|

El diagrama de timing (el cual es importante para la deducción de la distancia) para este sensor se muestra a continuación:

![timing_HC-SR04](/img/sensores/timing_HC-SR04.png)


