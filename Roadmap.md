# 🗺️ Rozszerzony Plan Rozwoju - Interaktywna Platforma do Nauki Kodu

Poniższy plan rozwoju jest podzielony na cztery fazy, z których każda zawiera kluczowe epiki (duże zadania) i szczegółowe zadania.

---

## Faza 1: MVP (Minimum Viable Product)

**Cel:** Uruchomienie bezpiecznej platformy z podstawową możliwością kodowania, autoryzacją i pierwszym kursem.

### 1.1. Fundamenty Technologiczne i Baza Danych (Neon)

* **Zadanie:** Konfiguracja repozytorium (Monorepo setup).
* **Zadanie:** Wdrożenie i konfiguracja instancji **Neon (PostgreSQL)**.
* **Zadanie:** Użycie czystego SQL (`pg` driver) i zarządzanie migracjami (skrypty w `/migrations`).
* **Zadanie:** Konfiguracja CI/CD dla automatycznych wdrożeń (Vercel/Netlify dla FE, AWS/GCP dla BE).

### 1.2. Moduł Użytkownika i Logowanie

* **Zadanie:** Implementacja autoryzacji (Rejestracja/Logowanie/Reset hasła) z użyciem JWT.
* **Zadanie:** Stworzenie podstawowego widoku profilu użytkownika (`/profile`).

### 1.3. Auto-Grading MVP (Python Sandbox)

* **Zadanie:** Implementacja usługi **Runner Engine** (w kontenerze Docker) wspierającej **tylko język Python**.
* **Zadanie:** Ustalenie limitów zasobów (CPU, Memory, Timeout) dla kontenerów (Cgroup).
* **Zadanie:** Stworzenie endpointu `/submit-code` i integracja z tabelą `submission_results` (status PENDING/COMPLETED).

### 1.4. Pierwsza Treść i Edytor

* **Zadanie:** Integracja **Monaco Editor** (lub alternatywnego) na stronie wyzwania.
* **Zadanie:** Stworzenie 10-15 pierwszych wyzwań wprowadzających do Pythona (zmienne, warunki, pętle) z definicjami testów w `test_definitions`.
* **Zadanie:** Implementacja widoku wyników (wyświetlenie `detailed_feedback` z Runnera po zakończeniu).

---

## Faza 2: Rozszerzenie i Usprawnienia (Core Experience)

**Cel:** Ulepszenie doświadczenia użytkownika poprzez grywalizację, lepszy feedback i rozszerzenie języków.

### 2.1. Grywalizacja (Gamification)

* **Zadanie:** Mechanizm naliczania i aktualizacji `total_xp` po pomyślnym ukończeniu zadania.
* **Zadanie:** Wdrożenie tabeli i logiki dla **Rankingów (Leaderboard)** (np. ranking dzienny/tygodniowy).
* **Zadanie:** Stworzenie 5-10 **Odznak** (np. "Pierwsza Funkcja", "Mistrz Pętli") i mechanizmu ich zdobywania.

### 2.2. Ulepszony Feedback i UX

* **Zadanie:** Implementacja mechanizmu **Podpowiedzi (Hints)**. Użytkownik może je odblokować za punkty lub czas.
* **Zadanie:** Ulepszenie parsowania błędu Runnera, aby pokazać błędy składniowe w edytorze w odpowiedniej linii.
* **Zadanie:** Dodanie wizualizacji postępów (procent ukończenia modułu/kursu).

### 2.3. Dodanie Języka SQL

* **Zadanie:** Implementacja obsługi języka **SQL** w Runner Engine (np. użycie lekkiego kontenera z PostgreSQL w środku).
* **Zadanie:** Stworzenie **Modułu SQL** (5 lekcji: SELECT, WHERE, JOIN, INSERT/UPDATE).
* **Zadanie:** Wdrożenie specjalnego widoku na frontendzie dla wyzwań SQL (np. tabela z wynikiem zapytania).

---

## Faza 3: Wspólnota i Projekty

**Cel:** Zbudowanie interakcji społecznościowej i przejście do większych zadań symulujących pracę w świecie rzeczywistym.

### 3.1. Narzędzia Wspólnoty

* **Zadanie:** Wdrożenie sekcji **Komentarzy/Forum** pod każdą lekcją.
* **Zadanie:** Funkcjonalność zgłaszania **błędów w zadaniu** przez użytkowników.
* **Zadanie:** System **"Lubię to"** dla rozwiązań i komentarzy.

### 3.2. Projekty Końcowe

* **Zadanie:** Dodanie typu lekcji `project` w tabeli `lessons`.
* **Zadanie:** Stworzenie **pierwszego projektu otwartego** (np. prosty kalkulator konsolowy z interfejsem użytkownika).
* **Zadanie:** Wdrożenie funkcji **Code Review:** Użytkownik zgłasza projekt do oceny, a inni użytkownicy/moderatorzy mogą dodawać komentarze.

### 3.3. Zarządzanie Treścią (CMS)

* **Zadanie:** Stworzenie prostego interfejsu administracyjnego (CMS) dla administratorów/edytorów.
* **Zadanie:** Możliwość łatwego dodawania/edycji treści lekcji, starter code i testów jednostkowych bezpośrednio w CMS.

---

## Faza 4: Skalowalność i Treści Zaawansowane

**Cel:** Stabilizacja systemu pod kątem obciążenia, wprowadzenie zaawansowanej treści i innowacji.

### 4.1. Optymalizacja i Stabilność

* **Zadanie:** Audyt wydajności **Neon** (indeksy, optymalizacja zapytań) i monitorowanie kosztów.
* **Zadanie:** Ulepszenie obsługi kolejki Runner Engine pod dużym obciążeniem.
* **Zadanie:** Wdrożenie mechanizmów cache (np. Redis) dla często pobieranych danych (kursy, rankingi).

### 4.2. Zaawansowane Kursy i Języki

* **Zadanie:** Dodanie zaawansowanego kursu **Struktury Danych i Algorytmy (DSA)**.
* **Zadanie:** Dodanie trzeciego języka (np. **JavaScript/TypeScript**).
* **Zadanie:** Implementacja **Testów Wydajnościowych** w Runner Engine (sprawdzanie złożoności czasowej $O(n)$).

### 4.3. Innowacje i AI

* **Zadanie:** Wdrożenie **Eksperymentalnego AI-Coacha**.
    * **Zadanie:** Analiza kodu użytkownika po nieudanych próbach.
    * **Zadanie:** Sugerowanie lepszych praktyk i optymalizacji kodu.
* **Zadanie:** Funkcjonalność **Tworzenia Własnych Wyzwań:** Użytkownicy mogą tworzyć zadania z własnymi testami jednostkowymi.