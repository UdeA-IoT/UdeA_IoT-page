# Proximidad y contacto

En esta sección se trararán los sensores de contacto y proximidad:

![sensores_distancia](/img/sensores/sensores_distancia.png)

## Contacto

### Touch Screens

Los Touch Screens (pantallas tactiles) son principalmente empleados en celulares y tablets como dispositivo de entrada. Existen varios tipos de Touch Screens ([link](https://tru-vumonitors.com/touch-screen-basics/)) siendo los de tipo resistivo, los mas comunes ([link](https://www.dush.co.jp/english/museum/touchscreens/technologies/Resistive.asp)). Un touch Screen esta compuesto por dos laminas transparentes cubiertas por una superficie conductora y separadas por medio de unos unos puntos de aislamiento uniformemente espaciados. Como la superficie exterior es flexible, cuando esta es precionada esta hace contacto con la superficie interior lo cual puede ser empleado para determinar las coordenada (X,Y) en las que se realizo el toque. La siguiente figura ilustra este tipo de componente.

![touch_screen_resistivo](/img/sensores/tactiles/touch_screen_resistivo.jpg)

La siguiente figura muestre un Touch Screen de 4 wires:

![touch_creen_4wires](/img/sensores/tactiles/touch_creen_4wires.png)

Para determinar la posición X de un toque, A se fija a 0 V y B se pone a 5 V lo cual, establece una diferencia de potencial a lo largo lamina superior. Asi mismo, en el toque, el voltaje medido en C, o para el caso D, será proporcional a la posición X cuyas coordenadas se pueden obtener mediante un conversor analogo a digital. 

Tal y como se muestra en la siguiente figura, la capa conductora actúa como un potenciómetro con C como control deslizante. Si el dispositivo que mide el voltaje en C tiene una impedancia de entrada muy alta, entonces se puede ignorar la resistencia de la pista desde la superficie hasta el terminal C. Como la mayoría de los microcontroladores tiene un conversor analógo a digital con una alta resistencia de entrada (normalmente varios MΩ); entonces, el voltaje en C estará entre 0 y 5 V en proporción directa a la distancia de A del toque. La siguiente figura muestra esto:

![posicion_x](/img/sensores/tactiles/posicion_x.png)

:::tip
En la pagina **Resistive Touch screen** ([link](https://javalab.org/en/resistive_touch_screen_en/)) se muestra una animación del proceso resultante.
:::


Para obtener la posición Y, lo que se se hace es establecer el voltaje de C a 0 V, el de D a 5 V y se mide el voltaje en A o B. Todo este procesamiento es llevado a cabo mediante un chip controlador de propósito especial o un microcontrolador. La siguiente figura (tomada de **4-Wire Resistive Touch Screen Interfacing with ESP32** ([link](https://www.electronicwings.com/esp32/4-wire-resistive-touch-screen-interfacing-with-esp32))) resume el proceso de obtención de coordenadas:

![get_posiciones](/img/sensores/tactiles/get_posiciones.png)

La siguiente figura muestra tomada de la pagina **4-Wire Resistive Touch Screen Interfacing with ESP32** ([link](https://www.electronicwings.com/esp32/4-wire-resistive-touch-screen-interfacing-with-esp32)), un caso de uso en el que se conecta un Touch Screen a un ESP32:

![conexion](/img/sensores/tactiles/conexion.png)

### Sensor capacitivo

Los sensores capacitivos pueden ser empleados para detectar toque o proximidad de objetos metalicos o no metalicos, lo cual los hace una alternativa a los interruptores mecanicos. 

Estos sensores funcionan mediante la detección del cambio en la capacitancia la cual se da  cuando una carga capacitiva (una mano o un dedo por ejemplo) se acerca o toca el sensor, el cual activa un interruptor para indicar la detección o el toque. 

![sensor_capacitivo](/img/sensores/capacitivo/sensor_capacitivo.png)

Mediante el uso de la libreria Capacitive Sensing Library ([link](https://playground.arduino.cc/Main/CapacitiveSensor/)) la cual permite convertir dos o mas pines de un Arduino para el sensado de la capacitancia. 

![CapacitiveTouchSensing](/img/sensores/capacitivo/CapacitiveTouchSensing.png)

Existen módulos de detección capacitivos con un circuito de acondicionamiento que convierte la capacitancia en niveles logicos binarios lo cual permite que la interacción con este modulo se reduzca al manejo de entradas y salidas digitales sin tenernos que preocupar por el uso de librerias especializadas (como la anterior). Un ejemplo estos es el modulo **Grove - Touch Sensor** ([link](https://wiki.seeedstudio.com/Grove-Touch_Sensor/)) disponible en el laboratorio.

![groove_sensor](/img/sensores/capacitivo/groove_sensor.png)

## Proximidad

### Sensor de ultrasonido

Estos sensores son empleados para medir distancia a la que se encuentra un objeto. Para esto, el dispositivo envia un pulso de ultrasonico (con una frecuencia aproximada de 40 kHz) y calculan el tiempo que tarda en volver el reflejo. Con el tiempo obtenido y conociendo la velocidad del sonido en el medio, es posible el calculo de la distancia mediante un calculo sencillo. La siguiente figura resume el funcionamiento:

![HC-SR04_fig2](/img/sensores/ultrasonido/HC-SR04_fig2.png)

La expresión para el calculo de la distancia depende de los siguientes parametros:
* $d$: Distancia al objeto (lo que necesitamos obtener).
* $V_S$: Velocidad del sonido
* $t_{\mu s}$: Tiempo medido entre la transmisión y la recepción de la señal (en $\mu s$).
* $D$: Distancia total recorrida por la onda.

De acuerdo a la figura anterior, si se tiene en cuenta que la onda viaja una distancia total de $D=2d$ tenemos que:

$$
V_S=\frac{D}{t_{\mu s}} = \frac{2d}{t_{\mu s}}\; \left[\frac{m}{\mu s}\right]
$$

Si $t$ es el tiempo en segundos, sabiendo que $1s=10^6\mu s$, entonces tenemos que, $t=10^6t_{\mu s}\rightarrow t_{\mu s} = 10^{-6}t$. Al expresar la distancia $d$ en (m) y en terminos de los parametros ya mencionados tenemos:

$$
d = \frac{V_St_{\mu s}}{2}=\frac{V_S(10^{-6}t)}{2}\;[m]
$$

Si lo que al final se desea obtener el la distancia en centimetros tenemos:

$$
d = \frac{V_S(10^{-4}t)}{2}\;[cm]
$$


Teniendo en cuenta que la velocidad del sonido es $V_S \approx 343 \frac{m}{s}$ entonces la expresión para el calculo de la distancia quedara como:

$$
d = 0.01715t\;[cm]
$$

La siguiente figura muestra las señales entre el microcontrolador y el sensor de sonido:

![HC-SR04](/img/sensores/ultrasonido/Working-of-HC-SR04-Ultrasonic-Sensor-1024x394.jpg)

Como se nota en la figura anterior, el ancho de la señal **ECHO** es quien da la información que le toma a la señal de sonido en ir y volver $(t_{\mu s})$.

En la pagina de Random Nerd Tutorials se encuentra un [tutorial](https://randomnerdtutorials.com/complete-guide-for-ultrasonic-sensor-hc-sr04/) (**ESP32 with HC-SR04 Ultrasonic Sensor with Arduino IDE**) donde se usa el sensor de ultrasonido **HC-SR04** con el **ESP32**. A continuación se muestra la conexión tipica de este sensor con un **ESP32**:

![HC-SR04](/img/sensores/ultrasonido/ESP32-Board-HC-SR04-Ultrasonic-Sensor-Module-Arduino.jpg)

### Sensor infrarrojo

Los sensores infrarojos permiten medir rangos de distancia menores que en los que se emplean sensado por ultrasonido. Dentro de este tipo de sensores, uno de los mas comunmente usados es el Sharp **GP2Y0A02YK0F** ([datasheet](https://image.dfrobot.com/image/data/SEN0014/gp2y0a21yk0f.pdf)).

Este sensor esta compuesto de dos lentes:
* **Lente Emisor**: Led Emidor de de IR el cual emite el haz de luz.
* **Lente Detector**: Fotodetector sensible a la posición (position-sensible photodetector - PSD) sobre el cual incide el has reflejado. Como la conductividad del PSD depende de la posición donde incide el haz, la cual al ser convertida en un voltaje puede ser aprovechada para medir la distancia.

![sharp](/img/sensores/infrarojo/sensor_distancia_infrarrojo.png)

Como se puede observar en la suguiente curva, el voltaje de salida es inversamente proporsional a la distancia. 

![curva](/img/sensores/infrarojo/curva.png)

Como se muestra en el gráfico anterior, la respuesta del sensor no es lineal. De modo que, para obtener una medida mas exacta para la distancia es necesario conocer la relación entre voltaje y distancia lo cual, puede ser hecho almacenando en memoria los valores en una tabla ([link](https://github.com/guillaume-rico/SharpIR)) o tambien, empleando alguna expresión matematica que permita una aproximación mejor que si se lleva a cabo una linealización ([link](https://wiki.dfrobot.com/SHARP_GP2Y0A41SK0F_IR_ranger_sensor__4-30cm__SKU_SEN0143)). 

