# EV Töltési Idő Kalkulátor

Egy kalkulátor, amely megbecsüli az elektromos járművek töltési idejét az otthoni töltési lehetőségek (1 vagy 3 fázis, állítható áramerősség), az akkumulátor kapacitása és a töltöttségi állapot alapján.

**Verzió:** 1.0.0  
**Metodológia:** Spec-Driven Development (SDD)

## Éles verzió

Az alkalmazás elérhető GitHub Pages-en:  
**https://vidisopi.github.io/ev-toltesi-kalkulator/**

## Telepítés és futtatás

```bash
# Klónozás
git clone https://github.com/Vidisopi/ev-toltesi-kalkulator.git
cd ev-toltesi-kalkulator

# Telepítés
npm install

# Lokális futtatás
npm run dev
```

A böngészőben: `http://localhost:3000`

## Alaphasználat

Az alkalmazás nem igényel API kulcsot — teljesen kliens-oldali.

### Bemeneti paraméterek

| Paraméter | Tartomány | Alapértelmezett |
|---|---|---|
| Fázis | 1 / 3 | 3 |
| Áramerősség (A) | 6–32 A | 16 A |
| Akkumulátor kapacitás (kWh) | 10–150 kWh | 75 kWh |
| Kezdő töltöttség (SOC) | 0–100% | 20% |
| Cél töltöttség (SOC) | 0–100% | 80% |
| Hatékonyság (%) | 70–100% | 90% |
| Áram ár (Ft/kWh) | 10–100 Ft | 40 Ft |

### Napelemes szcenárió (opcionális)

A kalkulátor tartalmaz egy opcionális napelemes bővítést is, mellyel becsülhető a napelemes töltés megtakarítása:

- **Panel teljesítmény** (1–30 kW)
- **Csúcs napsütéses óra/nap** (1–14 óra)
- **Elfogási arány** (10–100%)
- **Hálózatba visszatáplálás** opció + díj

## Számítási logika

### Töltési idő

```
töltési idő (óra) = (célSOC - kezdőSOC) × akkumulátorKapacitás / (feszültség × áram × hatékonyság)
```

Ahol:
- **1 fázis**: feszültség = 230 V
- **3 fázis**: feszültség = 400 V

### Napelemes hozam

```
napiNapelemesKwh = panelTeljesítményKw × csúcsNapsütésOra × (elfogásiArány / 100)
haviNapelemesKwh = napiNapelemesKwh × 30
```

### Önfogyasztás és megtakarítás

Ha a napelemes hozam nagyobb, mint az EV napi szükséglete, a különbözet önfogyasztottként kerül felhasználásra. A hálózatba visszatáplálás opcionálisan engedélyezhető.

## Technikai részletek

| Technológia | |
|---|---|
| Frontend | React + TypeScript |
| Build | Vite |
| Stílus | Tailwind CSS |
| Üzemeltetés | GitHub Pages |

## Funkciók

- ✅ 1 és 3 fázisú töltés támogatása
- ✅ Áramerősség slider (6–32 A)
- ✅ SOC-alapú számítás (kezdő és cél töltöttség)
- ✅ Hatékonyság beállítás
- ✅ Áram ár megadása (Ft/kWh)
- ✅ Benzin vs. EV költség összehasonlítás
- ✅ Napelemes szcenárió (ki/be kapcsolható)
- ✅ Hálózatba visszatáplálás számítás
- ✅ Havi/éves költségbecslés
- ✅ Teljesen kliens-oldali — nincs API kulcs

## Scope (v1.x)

- ✅ Alap töltési idő kalkuláció
- ✅ ICE vs. EV összehasonlítás
- ✅ Napelemes szcenárió bővítés
- ⏳ Útvonal-tervezés töltés becsléssel
- ⏳ Többjármű profile támogatás

## Licenc

MIT
