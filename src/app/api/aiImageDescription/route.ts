import { NextResponse } from "next/server";
import { OpenAI } from "openai";

// const systemPrompt = `Korisnik će ti dati sliku stavke koju prodaju. Ti mu trebas reći u koju prodajnu kategoriju 
// ta slika spada te mu dati dobar opis stavke koju prodaje.`;

// const systemPromptLong = `Korisnik će ti dati sliku stavke koju prodaju. Ti mu trebas reći u koju prodajnu kategoriju 
// ta slika spada te mu dati dobar opis stavke koju prodaje.
// Prve Kategorije moguće su: Posao i partnerstvo, Auto Moto Nautika, Nekretnine, Usluge, Strojevi i alati, Dom i ured, 
// Turizam, Financijske usluge, Mobiteli i oprema, Informatika, Multimedija, Glazba, Profesionalna oprema, Poljoprivreda, Moda i dodaci, 
// Sve za školu, Dječji kutak, Sport i zdravlje, Kućni ljubimci, Literatura, Kolekcionarstvo, Osobni kontakti, Brak i veze, Ostalo.
// Isto tako imas i pod kategorije recimo za Auto Moto Nautika su: Automobili, Motocikli, Gospodarska vozila, Kamperi i kamp prikolice, Nautika, Gume i felge, Dijelovi i oprema.
// Za ostale podkategorije ostalih nabrojanih kategorija koristi znanje prepoznavanja slika.`; // 400

export async function POST(request: Request) {
  const openai = new OpenAI();
  const image = await request.json();

  const resp = await openai.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 85,
    messages: [
      {
        role: "system",
        content: 'Hrvatski',
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Prodajna kategorija i podkategorije za ovu stavku odvojenu s > u jednom redu.", // 120/15
            // text: "Napiši prodajnu kategoriju te osnovni opis stavke koju prodajem u jednoj rečenici.", // 120/40
            // text: "Napiši mi prodajnu kategoriju te podkategorije koje pripadaju ovoj stavci.", // Too long description
          },
          {
            type: "image_url",
            image_url: {
              url: image,
              detail: "low",
            },
          },
        ],
      },
    ],
  });

  return new NextResponse(JSON.stringify(resp), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}
