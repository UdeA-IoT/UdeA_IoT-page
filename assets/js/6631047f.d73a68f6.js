"use strict";(self.webpackChunkude_a_io_t_page=self.webpackChunkude_a_io_t_page||[]).push([[6582],{7720:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>o,contentTitle:()=>t,default:()=>h,frontMatter:()=>a,metadata:()=>d,toc:()=>l});var i=r(7624),s=r(4552);r(6212),r(2440),r(6968);const a={sidebar_label:"Ejemplo 3a"},t="Ejemplo 3a - Medici\xf3n de temperatura y humedad usando el ESP32 con despliegue en un display LCD",d={id:"sesiones/percepcion/sesion5d_2",title:"Ejemplo 3a - Medici\xf3n de temperatura y humedad usando el ESP32 con despliegue en un display LCD",description:"Resumen",source:"@site/docs/sesiones/percepcion/sesion5d_2.md",sourceDirName:"sesiones/percepcion",slug:"/sesiones/percepcion/sesion5d_2",permalink:"/UdeA_IoT-page/docs/sesiones/percepcion/sesion5d_2",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/sesiones/percepcion/sesion5d_2.md",tags:[],version:"current",frontMatter:{sidebar_label:"Ejemplo 3a"},sidebar:"sesionesSidebar",previous:{title:"Introducci\xf3n",permalink:"/UdeA_IoT-page/docs/sesiones/percepcion/sesion5d_1"},next:{title:"Introducci\xf3n",permalink:"/UdeA_IoT-page/docs/sesiones/percepcion/sesion6a"}},o={},l=[{value:"Resumen",id:"resumen",level:2},{value:"Hardware",id:"hardware",level:2},{value:"Componentes",id:"componentes",level:3},{value:"Esquematico",id:"esquematico",level:3},{value:"Diagrama de conexi\xf3n",id:"diagrama-de-conexi\xf3n",level:3},{value:"Software",id:"software",level:2},{value:"Librerias empleadas",id:"librerias-empleadas",level:4},{value:"Programa",id:"programa",level:4},{value:"Test de la aplicaci\xf3n",id:"test-de-la-aplicaci\xf3n",level:4},{value:"Referencias",id:"referencias",level:2}];function c(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.M)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"ejemplo-3a---medici\xf3n-de-temperatura-y-humedad-usando-el-esp32-con-despliegue-en-un-display-lcd",children:"Ejemplo 3a - Medici\xf3n de temperatura y humedad usando el ESP32 con despliegue en un display LCD"}),"\n",(0,i.jsx)(n.h2,{id:"resumen",children:"Resumen"}),"\n",(0,i.jsx)(n.p,{children:"Realizar una aplicaci\xf3n muestre la tempetatura y la humedad obtenida con un sensor DHT11 en un display LCD. Se recomienda que haga uso del puerto serial para hacer debug de la aplicaci\xf3n."}),"\n",(0,i.jsx)(n.h2,{id:"hardware",children:"Hardware"}),"\n",(0,i.jsx)(n.h3,{id:"componentes",children:"Componentes"}),"\n",(0,i.jsx)(n.p,{children:"La siguiente tabla muestra los componentes principales del circuito a montar:"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Componentes"}),(0,i.jsx)(n.th,{children:"Cantidad"}),(0,i.jsx)(n.th,{children:"Observaciones"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"ESP32"}),(0,i.jsx)(n.td,{children:"1"}),(0,i.jsx)(n.td,{})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"DHT11 Temperature and Humidity Module"}),(0,i.jsx)(n.td,{children:"1"}),(0,i.jsxs)(n.td,{children:["Disponible en el kit Elegoo (",(0,i.jsx)(n.a,{href:"https://cdn.sparkfun.com/assets/b/3/f/9/d/OKY3068-1.pdf",children:"datasheet"}),")"]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"LCD 1602 Module"}),(0,i.jsx)(n.td,{children:"1"}),(0,i.jsxs)(n.td,{children:["Disponible en el kit Elegoo (",(0,i.jsx)(n.a,{href:"https://www.waveshare.com/datasheet/LCD_en_PDF/LCD1602.pdf",children:"datasheet"}),")"]})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"esquematico",children:"Esquematico"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"esquematico",src:r(9960).c+"",width:"1359",height:"1233"})}),"\n",(0,i.jsx)(n.h3,{id:"diagrama-de-conexi\xf3n",children:"Diagrama de conexi\xf3n"}),"\n",(0,i.jsx)(n.p,{children:"La conexi\xf3n entre el sensor el ESP32 y los modulos de hardware externo se muestra a continuaci\xf3n:"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"conexion",src:r(6956).c+"",width:"1896",height:"1578"})}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Archivo Fritzing"})}),"\n",(0,i.jsxs)(n.p,{children:["El archivo Fritzing ",(0,i.jsx)(n.strong,{children:"dh11_lcd-esp32.fzz"})," del ejemplo se puede descargar del siguiente ",(0,i.jsx)(n.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:r(9802).c+"",children:"[link]"})]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"software",children:"Software"}),"\n",(0,i.jsx)(n.h4,{id:"librerias-empleadas",children:"Librerias empleadas"}),"\n",(0,i.jsxs)(n.p,{children:["Se agregaron las siguientes librerias (",(0,i.jsx)(n.strong,{children:"En construcci\xf3n"}),")"]}),"\n",(0,i.jsx)(n.h4,{id:"programa",children:"Programa"}),"\n",(0,i.jsx)(n.p,{children:"El programa codificado se muestra a continuaci\xf3n:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-cpp",children:'// Example testing sketch for various DHT humidity/temperature sensors\r\n// Written by ladyada, public domain\r\n\r\n// REQUIRES the following Arduino libraries:\r\n// - DHT Sensor Library: https://github.com/adafruit/DHT-sensor-library\r\n// - Adafruit Unified Sensor Lib: https://github.com/adafruit/Adafruit_Sensor\r\n\r\n\r\n#include <LiquidCrystal.h>\r\n#include "DHT.h"\r\n\r\n#define DHTPIN 19     // Digital pin connected to the DHT sensor\r\n\r\n// Uncomment whatever type you\'re using!\r\n#define DHTTYPE DHT11   // DHT 11\r\n//#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321\r\n//#define DHTTYPE DHT21   // DHT 21 (AM2301)\r\n\r\n// Connect pin 1 (on the left) of the sensor to +5V\r\n// NOTE: If using a board with 3.3V logic like an Arduino Due connect pin 1\r\n// to 3.3V instead of 5V!\r\n// Connect pin 8 of the sensor to whatever your DHTPIN is\r\n// Connect pin 3 (on the right) of the sensor to GROUND (if your sensor has 3 pins)\r\n// Connect pin 4 (on the right) of the sensor to GROUND and leave the pin 3 EMPTY (if your sensor has 4 pins)\r\n// Connect a 10K resistor from pin 2 (data) to pin 1 (power) of the sensor\r\n\r\n// Initialize DHT sensor.\r\n// Note that older versions of this library took an optional third parameter to\r\n// tweak the timings for faster processors.  This parameter is no longer needed\r\n// as the current DHT reading algorithm adjusts itself to work on faster procs.\r\nDHT dht(DHTPIN, DHTTYPE);\r\n\r\n// initialize the library by associating any needed LCD interface pin\r\n// with the arduino pin number it is connected to\r\nconst int rs = 22, en = 23, d4 = 4, d5 = 0, d6 = 2, d7 = 15;\r\nLiquidCrystal lcd(rs, en, d4, d5, d6, d7);\r\n\r\nvoid setup() {\r\n  Serial.begin(9600);\r\n  Serial.println(F("DHTxx test!"));\r\n  dht.begin();\r\n\r\n  // set up the LCD\'s number of columns and rows:\r\n  lcd.begin(16, 2);\r\n  // Print a message to the LCD.\r\n  lcd.print("LCD Ready!");\r\n}\r\n\r\nvoid loop() {\r\n  // Wait a few seconds between measurements.\r\n  delay(1000);\r\n\r\n  // Reading temperature or humidity takes about 250 milliseconds!\r\n  // Sensor readings may also be up to 1 seconds \'old\' (its a very slow sensor)\r\n  float h = dht.readHumidity();\r\n  // Read temperature as Celsius (the default)\r\n  float t = dht.readTemperature(); \r\n  // Check if any reads failed and exit early (to try again).\r\n  \r\n  // Print readings using the serial port\r\n  if (isnan(h) || isnan(t)) {\r\n    Serial.println(F("Failed to read from DHT sensor!"));\r\n    return;\r\n  }\r\n  Serial.print(F("Humidity: "));\r\n  Serial.print(h);\r\n  Serial.print(F("%  Temperature: "));\r\n  Serial.print(t);\r\n  Serial.println(F("\xb0C "));\r\n\r\n  // Print readings using the lcd\r\n  lcd.clear();  \r\n  //Choosing the first line and row\r\n  lcd.setCursor(0,0);\r\n  //Typing Humedad:   to the first line starting from the first row\r\n  lcd.print("Humedad: ");\r\n  //Typing the humidity readings after "Humedad: "\r\n  lcd.print(h);\r\n  lcd.print("%");\r\n  lcd.setCursor(0,1);\r\n  //Typing Temperatura:   to the first line starting from the first row\r\n  lcd.print("Temp: ");\r\n  //Typing   the temperature readings after "Temperatura: " \r\n  lcd.print(t);\r\n  lcd.print((char)223); // displaying degree symbol (\xb0).\r\n  lcd.print("C");\r\n}\n'})}),"\n",(0,i.jsx)(n.h4,{id:"test-de-la-aplicaci\xf3n",children:"Test de la aplicaci\xf3n"}),"\n",(0,i.jsx)(n.p,{children:"En construcci\xf3n..."}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Simulaci\xf3n online"})}),"\n",(0,i.jsx)(n.p,{children:"La simulaci\xf3n del programa descargado se encuentra en ...)"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"referencias",children:"Referencias"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://docs.arduino.cc/learn/electronics/lcd-displays/",children:"https://docs.arduino.cc/learn/electronics/lcd-displays/"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,s.M)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},9802:(e,n,r)=>{r.d(n,{c:()=>i});const i=r.p+"assets/files/dh11_lcd-esp32-c0e66760f7ad051250f8329c6fdc728a.fzz"},6956:(e,n,r)=>{r.d(n,{c:()=>i});const i=r.p+"assets/images/dh11_lcd-esp32_bb-2dffa4b165b71371a929e50607f2a796.png"},9960:(e,n,r)=>{r.d(n,{c:()=>i});const i=r.p+"assets/images/dh11_lcd-esp32_sch-14e73a8d92a9bd8aa8f8c36653b42c06.png"}}]);