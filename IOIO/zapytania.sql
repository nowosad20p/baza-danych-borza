-- 1)wszyscy użytkownicy + rola
SELECT concat(imie_ratownika," ",nazwisko_ratownika)as "Imie i nazwisko", nr_telefonu as "numer telefonu", "ratownik"as rola FROM Ratownicy
UNION ALL 
SELECT concat(imie_lekarza," ",nazwisko_lekarza), nr_telefonu, "lekarz" FROM Lekarze
UNION ALL 
SELECT concat(imie_operatora," ",nazwisko_operatora), nr_telefonu, "operator" FROM Operatorzy
UNION ALL 
SELECT concat(imie_pacjenta," ",nazwisko_pacjenta), nr_telefonu, "pacjent" FROM Pacjenci
-- 2)ilość wezwań danego dnia
SELECT Date(data_wezwania) as "Data wezwania", count(id_wezwania) as "Ilość wezwań" FROM wezwania GROUP BY Date(data_wezwania) ORDER BY data_wezwania;

-- 3)ilość wezwań danej kategorii
SELECT nazwa_kategorii as "Kategoria wezwania", count(Wezwania.id_wezwania) as "Ilość wezwań" 
FROM wezwania INNER JOIN Kategorie_wezwania ON Kategorie_wezwania.id_kategorii=wezwania.id_kategorii GROUP BY nazwa_kategorii;

-- 4)wyposażenie danej karetki

select karetki.id_karetki,karetki.model_karetki, nazwa_wyposazenia from karetki inner join wyposazenie_karetki on karetki.id_karetki=wyposazenie_karetki.id_karetki inner join wyposazenie on wyposazenie.id_wyposazenia=wyposazenie_karetki.id_wyposazenia;
-- 5)ile razy ratownik i lekarz byli wzywani + kto pytau
SELECT concat(imie_lekarza," ",nazwisko_lekarza)as "Imie i nazwisko", count(Wezwania.id_wezwania)as "Ilość wezwań", "Lekarz" as rola FROM lekarze INNER JOIN Wezwania on Wezwania.id_lekarza=Lekarze.id_lekarza GROUP BY Lekarze.id_lekarza
UNION ALL
SELECT concat(imie_ratownika," ",nazwisko_ratownika),count(ratownicy_wezwanie.id_wezwania),"Ratownik"  FROM Ratownicy INNER JOIN ratownicy_wezwanie ON ratownicy_wezwanie.id_ratownika=ratownicy.id_ratownika INNER JOIN wezwania on wezwania.id_wezwania = ratownicy_wezwanie.id_wezwania GROUP BY Ratownicy.id_ratownika;
-- 6) ile było wezwań do kotów i psów
SELECT "Kot" Zwierze, count(id_wezwania) "Ilość wezwań" from wezwania WHERE id_kategorii = 5 || id_kategorii = 13 group by (Zwierze)
UNION
SELECT "Pies" Zwierze, count(id_wezwania) from wezwania WHERE id_kategorii = 19 || id_kategorii = 14 group by (Zwierze)

-- 7) left czy tam right join lol
select Kategorie_wezwania.nazwa_kategorii,count(Wezwania.id_wezwania) as "Ilość wezwań" 
FROM wezwania RIGHT JOIN Kategorie_wezwania ON Kategorie_wezwania.id_kategorii=wezwania.id_kategorii GROUP BY nazwa_kategorii 

