export default {
  "product": {
  "id": "629f72ab-cf7a-4684-8bbf-19efa678a57b",
    "countryA3": "RUS",
    "country": "Russland",
    "serviceId": "9a3a339a-ef61-406a-9623-a503f54f019e",
    "service": "Geschäftsreise",
    "duration": "1 Jahr",
    "multiplicity": "1",
    "processDuration": {
    "quantity": 7,
      "dimension": "d",
      "hours": 168
  },
  "servedResidenceRegions": null,
    "discounts": null,
    "suppServices": [
    {
      "id": "878bcc0a-a4db-4f4f-8f51-21c2cf2b0d91",
      "name": "Ausfüllen von Online-Visumantrag",
      "description": "",
      "price": 15.0000
    },
    {
      "id": "3a33547f-9c73-413c-8fcd-fe2f4dd5fc81",
      "name": "Auslandskrankenversicherung",
      "description": "<p>Abschluss einer gültigen Auslandskrankenversicherung für die gesamte Dauer Ihrer Reise (Bitte beachten Sie, dass bei Antragstellern ab 65 Jahren ein Zuschlag bei der Versicherung anfällt) </p>",
      "price": 50.0000
    },
    {
      "id": "deacde5d-2b1e-4ab8-a1fa-965f0971c8cf",
      "name": "Nachweis über die Rückkehrwilligkeit für Geschäftsreisende",
      "description": "",
      "price": 25.0000
    }
  ],
    "servicePackagesInfo": "",
    "servicePackages": [
    {
      "id": "b2b93f1f-6c61-4d94-9bc0-96be47390bdb",
      "name": "Standard",
      "description": "",
      "price": 0.0,
      "includedServices": []
    },
    {
      "id": "49dca7b2-e9cf-46e5-badc-770de44b80fb",
      "name": "Comfort",
      "description": "",
      "price": 80.0000,
      "includedServices": [
        "878bcc0a-a4db-4f4f-8f51-21c2cf2b0d91",
        "deacde5d-2b1e-4ab8-a1fa-965f0971c8cf",
        "3a33547f-9c73-413c-8fcd-fe2f4dd5fc81"
      ]
    }
  ]
}
}
