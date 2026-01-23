# Firebase Skills Koleksiyonu Kurulumu

## Koleksiyon Yapısı

Firebase Firestore'da `skills` koleksiyonunu oluşturun ve aşağıdaki yapıda dokümanlar ekleyin:

### Doküman Yapısı

```json
{
  "skill_name": "TypeScript",
  "field": ["front_end", "back_end"],
  "skill_logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "order": 1
}
```

### Alanlar

- **skill_name** (string, zorunlu): Skill'in adı
- **field** (array, zorunlu): Skill'in kullanıldığı alanlar
  - `front_end`
  - `back_end`
  - `mobile`
  - `devops`
  - vb.
- **skill_logo** (string, zorunlu): Logo URL'si (CDN veya Firebase Storage)
- **order** (number, zorunlu): Sıralama için numara

## Örnek Skills

### 1. TypeScript
```json
{
  "skill_name": "TypeScript",
  "field": ["front_end", "back_end"],
  "skill_logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "order": 1
}
```

### 2. JavaScript
```json
{
  "skill_name": "JavaScript",
  "field": ["front_end", "back_end"],
  "skill_logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "order": 2
}
```

### 3. Vue.js
```json
{
  "skill_name": "Vue.js",
  "field": ["front_end"],
  "skill_logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  "order": 3
}
```

### 4. Nuxt.js
```json
{
  "skill_name": "Nuxt.js",
  "field": ["front_end"],
  "skill_logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
  "order": 4
}
```

### 5. Firebase
```json
{
  "skill_name": "Firebase",
  "field": ["back_end"],
  "skill_logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "order": 5
}
```

### 6. Supabase
```json
{
  "skill_name": "Supabase",
  "field": ["back_end"],
  "skill_logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  "order": 6
}
```

## Logo Kaynakları

- **Devicons**: https://devicon.dev/
- **Simple Icons**: https://simpleicons.org/
- **CDN**: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/

## Firebase Console'dan Ekleme

1. Firebase Console'a gidin
2. Firestore Database'e gidin
3. `skills` koleksiyonunu oluşturun (yoksa)
4. "Add document" butonuna tıklayın
5. Yukarıdaki örneklerden birini kopyalayıp yapıştırın
6. "Save" butonuna tıklayın

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /skills/{document=**} {
      allow read: if true; // Herkes okuyabilir
      allow write: if false; // Sadece admin yazabilir (Firebase Admin SDK ile)
    }
  }
}
```

## Notlar

- `order` alanına göre sıralama yapılır (küçükten büyüğe)
- Logo URL'leri CDN'den veya Firebase Storage'dan olabilir
- `field` array'i birden fazla alan içerebilir
- Logo yüklenemezse fallback olarak skill adının ilk harfi gösterilir
