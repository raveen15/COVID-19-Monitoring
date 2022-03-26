
#include <Wire.h>
#include "MAX30100_PulseOximeter.h"

#define REPORTING_PERIOD_MS     5000

#include <ESP8266WebServer.h>

#include <Firebase_ESP_Client.h>

//Provide the token generation process info.
#include <addons/TokenHelper.h>

//Provide the RTDB payload printing info and other helper functions.
#include <addons/RTDBHelper.h>

/* 1. Define the WiFi credentials */
#define WIFI_SSID "********"
#define WIFI_PASSWORD "********"

//For the following credentials, see examples/Authentications/SignInAsUser/EmailPassword/EmailPassword.ino

/* 2. Define the API Key */
#define API_KEY "********"

/* 3. Define the RTDB URL */
#define DATABASE_URL "https://real-time-covid-monitoring-default-rtdb.firebaseio.com" //<databaseName>.firebaseio.com or \
                           //<databaseName>.<region>.firebasedatabase.app

/* 4. Define the user Email and password that alreadey registerd or added in
 * your project */
#define USER_EMAIL "********"
#define USER_PASSWORD "********"

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

PulseOximeter pox;

unsigned long previousMillis=0;
volatile boolean heartBeatDetected = false;

void onBeatDetected()
{
heartBeatDetected = true;
Serial.println("Beat!");

}

void setup()
{
  Serial.begin(115200);
  
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  
 Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);
  
    /* Assign the api key (required) */
    config.api_key = API_KEY;
  
    /* Assign the user sign in credentials */
    auth.user.email = USER_EMAIL;
    auth.user.password = USER_PASSWORD;
  
    /* Assign the RTDB URL (required) */
    config.database_url = DATABASE_URL;
  
    /* Assign the callback function for the long running token generation task */
    config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
    //Or use legacy authenticate method
    //config.database_url = DATABASE_URL;
    //config.signer.tokens.legacy_token = "<database secret>";
  
    //To connect without auth in Test Mode, see Authentications/TestMode/TestMode.ino
  
    Firebase.begin(&config, &auth);

    Firebase.reconnectWiFi(true);
    #if defined(ESP8266)
      fbdo.setBSSLBufferSize(512, 2048);
    #endif
  
  if (!pox.begin()) {
    Serial.println("FAILED");
    for(;;);
  } else {
    Serial.println("SUCCESS");
  }
  
  pox.setOnBeatDetectedCallback(onBeatDetected);
}

void sendSensorData(){
  int bpm = pox.getHeartRate();
  int SpO2 = pox.getSpO2();

  if(heartBeatDetected && bpm !=0) {
    if(SpO2>0){
      // here you put the variables what you have in ur db
      Firebase.RTDB.setIntAsync(&fbdo, "/1234/heartRate", bpm);
      Firebase.RTDB.setIntAsync(&fbdo, "/1234/oxygenLevel", SpO2);
      Serial.print("Heart rate:");
        Serial.print(bpm);
        Serial.print("bpm / SpO2:");
        Serial.print(SpO2);
        Serial.println("%");
    }
  }
}

void loop()
{
  pox.update();
  unsigned long currentMillis=millis();
    if(currentMillis-previousMillis>=REPORTING_PERIOD_MS)
    {
      pox.shutdown();
      sendSensorData();
      pox.resume();
      previousMillis=currentMillis;
    }
}
