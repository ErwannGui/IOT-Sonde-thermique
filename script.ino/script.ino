#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS_1 2

OneWire oneWire_in(ONE_WIRE_BUS_1);

DallasTemperature sensor_inhouse(&oneWire_in);

const int LM35 = A0; //on définit le port de sortie des données bluetooth, sur lequel est branché notre capteur
int LED[] = {"verte": 12, "rouge": 13}
float T; //on définit la variable de stockage de la température
float valor;
int Rx = 0;
int Tx = 1;

SoftwareSerial BT(Rx, Tx); // (RX, TX) (pin Rx BT, pin Tx BT)

void setup()
{
  Serial.begin(9600);// on démmarre le programme réglé sur 9600 bauds
  BT.begin(9600);
  pinMode(LED, OUTPUT);
  analogReference(INTERNAL);
  pinMode(Tx, OUTPUT);
  pinMode(Rx, INPUT);
}
void loop()
{
  valor = analogRead(LM35);// a priori, plusieurs problèmes ont été remontés, councernant la première mesure étant fausse. Il faudrait effectuer une lecture vide pour commencer et enchainer sur les mesures du capteur thermique
  T = ((5*(valor)*100)/1024);//on calcule la température en partant de la tension éléctrique (en volt)
  Serial.print("Température : ");
  Serial.println(T);
  //on affiche les données dans l'IDE
  delay(1000);// on ajoute un délai afin de se ne récupérer que des valeurs périodiquement

  if (T < 20.00)
  {
  digitalWrite(LED["verte"],HIGH);
  digitalWrite(LED["rouge"],LOW);
  }
  if (T > 20.00)
  {
  digitalWrite(LED["rouge"],HIGH);
  digitalWrite(LED["verte"],LOW);
  }
  // Si la température est supérieure à 20°C, la led verte s'allume, sinon c'est la rouge
}
// Ce code fonctionne avec une sonde LM35 relié à une arduino uno par cable
