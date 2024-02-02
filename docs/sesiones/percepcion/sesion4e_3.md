---
sidebar_label: 'Paso 2'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

# Paso 2 - Desarrollo de la aplicación en python (Texto)

## Requerimientos

1. Tener previamente instalada la libreria pyserial ([link](https://pypi.org/project/pyserial/)):

   ```pip install pyserial```

   La documentación de esta libreria se encuentra en: [pySerial’s documentation](https://pythonhosted.org/pyserial/)

2. Tener el hardware funcionando correctamente (paso 1).
   
## Software

Una vez se tiene la certeza de que el hardware funciona de acuerdo a lo esperado, codifique el siguiente programa en python. Guardelo como [```serialLedTerminal.py```](/img/sesiones/percepcion/4/ejemplo4/paso2/serialLedTerminal.py):

```python
import serial

ser = serial.Serial(port='COM7', baudrate=9200, timeout=.1)

def menu():
    print("Menu de control de la office " )
    print("1. Encender lampara" )
    print("2. Apagar lampara" )
    print("3. Salir de la aplicacion" )    

def lightON():
    ser.write(b'H')

def lightOFF():
    ser.write(b'L')

    
def main():
    print("SISTEMA DE CONTROL DE LA LAMPARA DE LA OFFICE")
    while True:
        menu()
        opc = input("Seleccione una opcion: ")
        if opc == '1':
            print("--> Encendiendo la lampara\n")
            ser.write(b'H')            
        elif opc == '2':
            print("--> Apagando la lampara\n")
            ser.write(b'L')
        elif opc == '3':
            ser.close()
            print("--> Chao bambino\n")
            break
        else:
            print("--> OPCION INVALIDA\n")

if __name__ == "__main__":
    main()
```

:::warning

No olvide adaptar la parte asociada al serial en el codigo anterior teniendo en cuenta la nomenclatura que se da en su sistema operativo. 

:::

## Probando la aplicación

Antes de probar la aplicación tenga en cuenta lo siguiente:
1. Cierre el Arduino IDE si lo tiene abierto, esto para que el puerto serial no este ocupado por la aplicación. Recuerde que el firmware debe haber sido previamente descargado y probado (paso 1).
2. Tenga el hardware conectado a la Maquina:
   

   ![conexion](/img/sesiones/percepcion/4/ejemplo4/hardware_bb.png)

3. Ejecute el script de python:
   
   ```bash
   python serialLedTerminal.py
   ```

   La salida de este se muestra a continuación:

   ![app_python](/img/sesiones/percepcion/4/ejemplo4/app_python.png)

   Si todo esta bien, el comportamiento deberá ser similar (Encendido y apagado del led) al que se obtuvo cuando se empleo la terminal serial en el paso 1 ([link](sesion4e_2#)).

   Si todo lo realizado en este paso fue correcto, vaya al paso 3 ([link](sesion4e_4#))

 




## Referencias

* https://mongoose.ws/documentation/tutorials/esp32/uart-bridge/
* https://ece353.engr.wisc.edu/serial-interfaces/uart-basics/
* https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/establish-serial-connection.html
* https://www.sparkfun.com/engineering_essentials
* https://docs.thinger.io/
* https://www.electronicwings.com/esp32/getting-started-with-esp32
* https://mongoose.ws/documentation/tutorials/esp32/uart-bridge/
