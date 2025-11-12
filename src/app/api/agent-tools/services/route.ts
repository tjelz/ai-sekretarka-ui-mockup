import { NextResponse } from 'next/server';

export async function GET() {
  const services = [
    {
      id: 'masaz-relaksacyjny',
      name: 'Masaż Relaksacyjny',
      description: 'Kojący masaż całego ciała z użyciem aromatycznych olejków',
      whatIsIt: 'Delikatny masaż całego ciała wykonywany z użyciem naturalnych olejków aromatycznych. Terapeuta stosuje łagodne, płynne ruchy, które pomagają w odprężeniu mięśni, poprawie krążenia i redukcji stresu. Zabieg wykonywany jest w ciepłym, przytulnym gabinecie przy spokojnej muzyce.',
      preparation: 'Przyjdź na zabieg w luźnym, wygodnym ubraniu. Przed masażem nie jedz ciężkich posiłków (przynajmniej 2 godziny wcześniej). Poinformuj terapeutę o ewentualnych alergiach na olejki oraz o problemach zdrowotnych. Po zabiegu wypij dużo wody.',
      duration: 60,
      price: 180,
      currency: 'PLN',
      category: 'Masaże'
    },
    {
      id: 'masaz-gorskimi-kamieniami',
      name: 'Masaż Gorącymi Kamieniami',
      description: 'Terapeutyczny masaż z użyciem rozgrzanych kamieni wulkanicznych',
      whatIsIt: 'Intensywny zabieg łączący tradycyjny masaż z termoterapią. Gładkie kamienie bazaltowe rozgrzewane są do temperatury około 50-60°C i układane na punktach energetycznych ciała. Ciepło kamieni penetruje głęboko w mięśnie, rozluźniając napięcia i poprawiając krążenie. Terapeuta używa także kamieni do wykonania masażu.',
      preparation: 'Nie stosuj tego zabiegu jeśli masz problemy z krążeniem, nadciśnienie lub jesteś w ciąży. Przed zabiegiem weź prysznic. Zjedz lekki posiłek 2-3 godziny przed sesją. Wypij dużo wody przed i po zabiegu. Unikaj alkoholu na 24 godziny przed zabiegiem.',
      duration: 90,
      price: 250,
      currency: 'PLN',
      category: 'Masaże'
    },
    {
      id: 'zabieg-na-twarz',
      name: 'Zabieg Pielęgnacyjny na Twarz',
      description: 'Kompleksowy zabieg oczyszczająco-nawilżający z maską',
      whatIsIt: 'Profesjonalny zabieg kosmetyczny składający się z kilku etapów: demakijażu, peelingu enzymatycznego, oczyszczania porów, tonizacji, nakładania serum i maski dostosowanej do typu skóry oraz finalnego nawilżenia kremem i ochrony SPF. Zabieg poprawia kondycję skóry, oczyszcza pory i dodaje blasku.',
      preparation: 'Przyjdź na zabieg bez makijażu lub z minimalnym makijażem (zostanie on usunięty). Dzień przed zabiegiem nie stosuj mocnych peelingów ani retinolu. Poinformuj kosmetyczkę o swoim typie skóry, alergiach i przyjmowanych lekach. Unikaj nadmiernego nasłonecznienia przez 2 dni przed zabiegiem.',
      duration: 75,
      price: 220,
      currency: 'PLN',
      category: 'Pielęgnacja Twarzy'
    },
    {
      id: 'peeling-ciala',
      name: 'Peeling Całego Ciała',
      description: 'Złuszczający peeling z naturalnych składników',
      whatIsIt: 'Zabieg złuszczający martwy naskórek z całego ciała przy użyciu naturalnego peelingu (sól morska, cukier lub kawa z olejkami). Terapeuta wykonuje masaż peelingujący w okrężnych ruchach, usuwając martwe komórki skóry. Po zabiegu skóra jest gładka, miękka i lepiej wchłania składniki odżywcze.',
      preparation: 'Przed zabiegiem weź prysznic. Nie golij się ani nie depiluj na 24 godziny przed zabiegiem. Unikaj peelingu jeśli masz podrażnienia skóry, skaleczenia lub oparzenia słoneczne. Po zabiegu nie opalaj się przez 24 godziny. Nawilżaj skórę kremem przez kilka dni po zabiegu.',
      duration: 45,
      price: 150,
      currency: 'PLN',
      category: 'Pielęgnacja Ciała'
    },
    {
      id: 'aromaterapia',
      name: 'Sesja Aromaterapii',
      description: 'Relaksująca sesja z użyciem olejków eterycznych',
      whatIsIt: 'Holistyczna terapia wykorzystująca naturalne olejki eteryczne w celu poprawy samopoczucia fizycznego i psychicznego. Sesja obejmuje doradztwo w wyborze odpowiednich olejków, łagodny masaż z ich użyciem oraz czas relaksu w otoczeniu aromatów. Olejki mogą pomóc w redukcji stresu, poprawie snu lub dodaniu energii.',
      preparation: 'Poinformuj terapeutę o swoich preferencjach zapachowych i celach sesji (relaks, energia, poprawa nastroju). Zgłoś ewentualne alergie lub uczulenia. Przyjdź w wygodnym ubraniu. Unikaj mocnych perfum przed sesją. Nie jedz ciężkiego posiłku na 2 godziny przed zabiegiem.',
      duration: 60,
      price: 170,
      currency: 'PLN',
      category: 'Terapie'
    },
    {
      id: 'manicure-hybrydowy',
      name: 'Manicure Hybrydowy',
      description: 'Profesjonalny manicure z lakierem hybrydowym',
      whatIsIt: 'Kompleksowa pielęgnacja dłoni i paznokci zakończona aplikacją trwałego lakieru hybrydowego utwardzanego lampą UV/LED. Zabieg obejmuje: kąpiel dłoni, usunięcie skórek, modelowanie paznokci, polerowanie płytki, aplikację bazy, koloru i topu. Manicure hybrydowy utrzymuje się 2-3 tygodnie bez odpryskiwania.',
      preparation: 'Jeśli masz stary lakier hybrydowy, przyjdź 15 minut wcześniej na jego usunięcie (lub usuń go wcześniej u kosmetyczki). Nawilżaj skórki kremem przez kilka dni przed zabiegiem. Poinformuj o alergiach na produkty kosmetyczne. Pomyśl o kolorze lakieru, który chcesz. Unikaj golenia rąk na 24h przed zabiegiem.',
      duration: 60,
      price: 120,
      currency: 'PLN',
      category: 'Paznokcie'
    },
    {
      id: 'pedicure-spa',
      name: 'Pedicure SPA',
      description: 'Luksusowy pedicure z masażem stóp',
      whatIsIt: 'Kompleksowa pielęgnacja stóp rozpoczynająca się od relaksującej kąpieli w ciepłej wodzie z solami i olejkami. Następnie: usuwanie zrogowaceń, obcinanie i modelowanie paznokci, usuwanie skórek, peeling stóp, masaż stóp i łydek oraz aplikacja lakieru (klasycznego lub hybrydowego). Zabieg kończy się nałożeniem nawilżającego kremu.',
      preparation: 'Przyjdź w otwartych butach lub weź ze sobą japonki (paznokcie będą mokre). Jeśli masz grzybicę lub infekcje stóp, przełóż zabieg do wyleczenia. Zjedz lekki posiłek przed zabiegiem. Nawilżaj stopy kremem przez kilka dni przed zabiegiem. Nie golij nóg na 24h przed pedicure.',
      duration: 75,
      price: 140,
      currency: 'PLN',
      category: 'Paznokcie'
    },
    {
      id: 'sauna-infrared',
      name: 'Sauna Infrared',
      description: 'Sesja w saunie na podczerwień',
      whatIsIt: 'Nowoczesna forma sanoterapii wykorzystująca promieniowanie podczerwone do głębokiego ogrzewania ciała. W przeciwieństwie do tradycyjnej sauny, temperatura powietrza jest niższa (45-60°C), ale ciepło penetruje głęboko w skórę. Sesja wspiera detoksykację, poprawia krążenie, pomaga w redukcji stresu i może wspomagać spalanie kalorii.',
      preparation: 'Przed sesją wypij przynajmniej 2 szklanki wody. Weź prysznic i osusz ciało. Nie jedz ciężkiego posiłku na godzinę przed sesją. Zabierz ręcznik. Podczas sesji możesz być nago lub w ręczniku/kostiumie. Po sesji obowiązkowo uzupełnij płyny (woda, sok, izotonik). Odpocznij 10-15 minut po wyjściu.',
      duration: 30,
      price: 80,
      currency: 'PLN',
      category: 'Wellness'
    },
    {
      id: 'oklady-borowinowe',
      name: 'Okłady Borowinowe',
      description: 'Detoksykujące okłady z naturalnej borowiny',
      whatIsIt: 'Terapeutyczny zabieg wykorzystujący lecznicze właściwości naturalnej borowiny. Ciepła borowina nakładana jest na ciało (całe lub wybrane partie), po czym ciało owija się folią i kocem termicznym. Minerały i substancje organiczne z borowiny wnikają w skórę, wspierając detoksykację, poprawiając krążenie i łagodząc dolegliwości bólowe stawów i mięśni.',
      preparation: 'Przed zabiegiem weź prysznic. Nie stosuj kremów ani olejków na ciało. Wypij szklankę wody przed zabiegiem. Nie stosuj jeśli masz problemy z krążeniem, nadciśnienie, jesteś w ciąży lub masz gorączkę. Po zabiegu weź ciepły prysznic i nawilż skórę. Zaplanuj czas na odpoczynek po zabiegu.',
      duration: 50,
      price: 160,
      currency: 'PLN',
      category: 'Terapie'
    },
    {
      id: 'masaz-antycellulitowy',
      name: 'Masaż Antycellulitowy',
      description: 'Intensywny masaż ujędrniający skórę',
      whatIsIt: 'Energiczny, głęboki masaż skupiony na partiach ciała z cellulitem (uda, pośladki, brzuch). Terapeuta stosuje intensywne techniki: ugniatanie, rozbijanie tkanki tłuszczowej, masaż bańką próżniową lub rollerem. Zabieg poprawia krążenie, wspiera spalanie tkanki tłuszczowej, ujędrnia skórę i redukuje widoczność cellulitu. Może być lekko bolesny.',
      preparation: 'Przed zabiegiem wypij dużo wody (przynajmniej 2 szklanki). Weź prysznic. Nie jedz ciężkiego posiłku na 2 godziny przed zabiegiem. Przygotuj się na to, że zabieg może być intensywny i lekko bolesny. Po zabiegu pij dużo wody przez resztę dnia. Unikaj słonych potraw. Masaż wymaga cyklu zabiegów (min. 10) dla widocznych efektów.',
      duration: 60,
      price: 200,
      currency: 'PLN',
      category: 'Masaże'
    }
  ];

  return NextResponse.json({
    services,
    currency: 'PLN',
    language: 'pl-PL'
  });
}
