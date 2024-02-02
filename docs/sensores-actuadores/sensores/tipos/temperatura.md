# Temperatura


Los sensores de temperatura son uno de los tipos mas comunes de sensores. Para la medición de la temperatura existen un gran numero de tecnicas diferentes, sin embargo solo se consideraran algunas.

![sensores_temperatura](/img/sensores/sensores_temperatura.png)

## Termistor

Un termistor (en ingles: **Thermistor: Thermal Resistor**) es una dispositivo cuya resistencia varia con la temperatura. A diferencia de las resistencias tradicionales, en un termistor, el valor de la resistencia varia significativamente al cambiar la temperatura. Por ejemplo un dispositivo de estos puede tener una resistencia de $5 k\Omega$ a 0°C y una resistencia de $100 \Omega$ a 100°C. 

Dependiendo de la forma como varia la resistencia al cambiar la temperatura, los termistores se pueden clasificar en dos tipos:
* **NTC (Negative Temperature Coefficient)**: Si la resistencia disminuye con el aumento de la temperatura.
* **PTC (Positive Temperature Coefficient)**: Si la resistencia aumenta cuando sube la temperatura.

Para medir la temperatura empleando un Termistor se usa un circuito divisor de voltaje tal y como el que se muestra en la siguiente figura:

![circuito_termistor](/img/sensores/temperatura/termistor_circuito.png)

Por ejemplo en la siguiente figura se muestra una conexión típica para este dispositivo usando un Arduino:

![temperature_thermistor](/img/sensores/temperatura/temperature_thermistor_bb.png)

Como el objetivo es obtener la temperatura, es necesario hacer previamente los siguientes pasos:

$$
V_o=\frac{R_{NTC}}{R_{NTC} + R}V_{in}
$$

En este caso, lo que nos interesa es conocer la resistencia asociada al Termistor ($R_{NTC}$) asi tenemos que:

$$
R_{NTC}=\frac{R\times V_o}{V_{in} - V_o}
$$

Como la temperatura depende de la resistencia del termistor: $T = f(R_{NTC})$, la expresión que describe esta relación se conoce como la **Steinhart–Hart equation** ([link](https://en.wikipedia.org/wiki/Steinhart%E2%80%93Hart_equation)). Si decimos para esta formula que $R = R_{NTC}$ enconces la expresión esta dada por:

$$
\frac{1}{T}=A+B\ln(R)+C(\ln(R))^3 
$$

Sin embargo, si el termistor es del tipo **NTC** en vez de usar la expresión anterior, se simplificara a:

$$
\frac{1}{T}=\frac{1}{T_0} + \frac{1}{B}\ln{(\frac{R}{R_0})}
$$

Donde:
* $T$: Temperatura que se esta midiendo
* $T_0$: Temperatura ambiente (25°C)
* $R_0$: Resistencia del sensor a temperatura ambiente. Tambien suele aparecer como $R_{25}$
* $R$: Resistencia a temperatura ambiente (la medida con el multimetro).
* $B$: Constante del material expresada en °K

Para proceder a usar la formula, lo que se hace entonces es reemplazar todas las constantes de la expresión anterior dejandola en terminos de la **resistencia de NTC** ($R$)  y la **temperatura** ($T$) en °K. Esto se hace usando una tabla ([link](https://cdn-shop.adafruit.com/datasheets/103_3950_lookuptable.pdf)) donde se muestra la relación entre estas variables. Por ejemplo, para temperatura ambiente los valores de la expresión anterios quedan:  $T_0 = 25°C = 298.75°K,\; R_0 = 10k\Omega,\;B=3950$. En el siguiente [link](https://learn.adafruit.com/thermistor/using-a-thermistor) de Arafruit muestran un código para arduino construido para el montaje previamente mostrado:

```cpp
// SPDX-FileCopyrightText: 2011 Limor Fried/ladyada for Adafruit Industries
//
// SPDX-License-Identifier: MIT

// Thermistor Example #3 from the Adafruit Learning System guide on Thermistors 
// https://learn.adafruit.com/thermistor/overview by Limor Fried, Adafruit Industries
// MIT License - please keep attribution and consider buying parts from Adafruit

// which analog pin to connect
#define THERMISTORPIN A0         
// resistance at 25 degrees C
#define THERMISTORNOMINAL 10000      
// temp. for nominal resistance (almost always 25 C)
#define TEMPERATURENOMINAL 25   
// how many samples to take and average, more takes longer
// but is more 'smooth'
#define NUMSAMPLES 5
// The beta coefficient of the thermistor (usually 3000-4000)
#define BCOEFFICIENT 3950
// the value of the 'other' resistor
#define SERIESRESISTOR 10000    

int samples[NUMSAMPLES];

void setup(void) {
  Serial.begin(9600);
  analogReference(EXTERNAL);
}

void loop(void) {
  uint8_t i;
  float average;

  // take N samples in a row, with a slight delay
  for (i=0; i< NUMSAMPLES; i++) {
   samples[i] = analogRead(THERMISTORPIN);
   delay(10);
  }
  
  // average all the samples out
  average = 0;
  for (i=0; i< NUMSAMPLES; i++) {
     average += samples[i];
  }
  average /= NUMSAMPLES;

  Serial.print("Average analog reading "); 
  Serial.println(average);
  
  // convert the value to resistance
  average = 1023 / average - 1;
  average = SERIESRESISTOR / average;
  Serial.print("Thermistor resistance "); 
  Serial.println(average);
  
  float steinhart;
  steinhart = average / THERMISTORNOMINAL;     // (R/Ro)
  steinhart = log(steinhart);                  // ln(R/Ro)
  steinhart /= BCOEFFICIENT;                   // 1/B * ln(R/Ro)
  steinhart += 1.0 / (TEMPERATURENOMINAL + 273.15); // + (1/To)
  steinhart = 1.0 / steinhart;                 // Invert
  steinhart -= 273.15;                         // convert absolute temp to C
  
  Serial.print("Temperature "); 
  Serial.print(steinhart);
  Serial.println(" *C");
  
  delay(1000);
}
```

## Termocupla

Una termocupla es un trasductor que convierte calor en voltaje. Este transductor esta formado por la unión de dos metales distintos, los cuales, al ser sometidos a una temperatura (punto caliente = punto de test) producen una diferencia de potencial en el otro extremo (punto frio = punto de medida). Este fenomeno se conoce como efecto Seebeck.


![termocoupla](/img/sensores/temperatura/thermocouple.png)

A diferencia de los termistores, las termocuplas se emplean para altas temperaturas; sin embargo, no son tan exactos por lo que no se recomienda su uso para aplicaciones donde se requiera buena precisión en las mediciones. 


![termocoupla_tipo_K](/img/sensores/temperatura/temperature_thermocouple_LRG.jpg)

La magnitud del voltaje generado depende de los dos metales empleados y de la temperatuda de la unión, razon por la cual existen diferentes tipos de termoculas. 

![graficas_termocuplas](/img/sensores/temperatura/graficas_termocuplas.png)

El tipo de termocupla depende de los metales que la componen tal y como se resume en la siguiente tabla:

|Tipo|Materiales|Rango °C|Sensibilidad (mV/°C)|
|---|---|---|---|
|E|Chromel - constantan|0 to 980|63|
|J|Iron - constantan|-180 to 760|53|
|K|Chromel - alumel|-180 to 760|41|
|R|Platinum - platinum/ rhodium 13%|0 to 1750|8|
|T|Copper - constantan|-180 to 370|43|

Para poder realizar mediciones de temperatura usando una termocupla es necesario emplear un circuito de acondicionamiento de señal lo cual implica el uso de componentes adicionales tal y como se muestra en la siguiente figura:

![acondicionamiento_termocuplas](/img/sensores/temperatura/circuito_acondicionamiento_termocupla.png)


Para facilitar las cosas, se emplean modulos de interfaz como el MAX6675 o el AD595. La siguiente figura muestra un caso en el que se usa el modulo AD595 ([link](https://www.electronicwings.com/sensors-modules/thermocouple)).

![arduino_termocupla](/img/sensores/temperatura/arduino_termocupla.png)

## Circuitos integrados para medir temperatura

Este tipo de sensores usan semiconductores (diodos o transistores) como elementos de sensado de temperatura. La ventaja de estos sobre los otros tipos de sensores, es que ademas del sensado, el procesamiento de la señal de voltaje (dependiente de la temperatura) y los calculos necesarios estan implementados dentro del mismo chip. Debido a que estos sensores no tienen partes móviles, son precisos, nunca se desgastan, no necesitan calibración, funcionan en muchas condiciones ambientales. Además son muy económicos y bastante fáciles de usar. Dependiendo del tipo de salida estos se clasifican en:
* Analog Output Thermometer ICs
* Digital Thermometer ICs

### Analog Output Thermometer ICs

Estos se caracterizan por que la salida de voltaje entregada es proporsional a la temperatura. Por ejemplo el TMP36 o LM35 son ejemplos de estos. Por ejemplo en el caso TMP36 la relación entre el voltaje y la temperatura es lineal (10 mV/°C) dentro de un rango de temperatura de  –40  +125°C y con una exactitud de ±2°C. 

![tmp_36](/img/sensores/temperatura/tmp_36.png)

Por otro lado, gracias a que el circuito de acondicionamiento esta dentro del chip, la conexión con un microcontrolador, para las aplicaciones tipicas, puede hacerse directa; sin embargo, si lo que se desea tener mejores prestaciones (inmunidad a ruido, presición, etc) este se puede conectar a un circuito externo adicional. La siguiente figura muestra un caso tipico de uso:

![circuito_tmp36](/img/sensores/temperatura/circuito_tmp36.png)

El calculo de la temperatura se obtiene a partir de la curva caracteristica del sensor ([TMP36](https://www.arduino.cc/en/uploads/Main/TemperatureSensor.pdf) en nuestro caso) y esta dada por la ecuación: $T = 100V_{out}-50$ la cual es una ecuación de la recta que se deduce de la siguiente figura:

![curva_caracteristica](/img/sensores/temperatura/curva_caracteristica.png)

Si se usa otro sensor del mismo tipo (por ejemplo el LM35), el procedimiento de calculo de la ecuación lineal que relaciona el voltaje y la temperatura es similar. En el tutorial de Adafruit **TMP36 Temperature Sensor** ([link](https://learn.adafruit.com/tmp36-temperature-sensor/overview)) se trata a mayor profundidad el caso del **TMP36** y se muestra como escribir un programa en Arduino que lo usa. 

### Digital Output Thermometer ICs

A diferencia de los chips analogicos, estos circuitos integrados tienen una interfaz serial que puede ser usada por los microcontroladores para obtener la información de la temperatura medida. Por ejemplo el sensor **DS18B20** usa un bus serial conocido como OneWire ([link](https://en.wikipedia.org/wiki/1-Wire)) el cual permite que multiples sensores compartan la misma linea de datos, lo cual constituye una ventaja evidente frente a los chips analogos. En el tutorial **Getting Temperature from Multiple DS18B20 Sensors** ([link](https://randomnerdtutorials.com/guide-for-ds18b20-temperature-sensor-with-arduino)) de **RANDOM NERD TUTORIALS** se explica el uso de este sensor. La siguiente figura tomada de de este tutorial ilustra un caso de uso con varios sensores de temperatura: 

![DS18B20_arduino](/img/sensores/temperatura/DS18B20_arduino.png)

