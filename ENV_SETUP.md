# .env Dosyası Kurulumu

## Önemli: FIREBASE_PROJECT_ID Eksik!

Console'da `projectId: '❌'` görüyorsanız, `.env` dosyanızda `FIREBASE_PROJECT_ID` eksik demektir.

## Adımlar

1. Proje kök dizininde `.env` dosyası oluşturun (yoksa)
2. Aşağıdaki değerleri doldurun:

```env
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id_here
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

## Firebase Bilgilerini Bulma

1. [Firebase Console](https://console.firebase.google.com) → Projenizi seçin
2. ⚙️ Project Settings (Proje Ayarları)
3. "Your apps" bölümünde Web uygulamanızı seçin (yoksa "Add app" → Web)
4. Config değerlerini kopyalayın

## Örnek .env Dosyası

```env
FIREBASE_API_KEY=AIzaSyCInDODE68eKVnWnCCT0PbiJaS4QAcjuIg
FIREBASE_AUTH_DOMAIN=myproject.firebaseapp.com
FIREBASE_PROJECT_ID=myproject-12345
FIREBASE_STORAGE_BUCKET=myproject-12345.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abc123def456
```

## Dev Sunucusunu Yeniden Başlatın

`.env` dosyasını güncelledikten sonra:

```bash
# Ctrl+C ile durdurun
npm run dev
```

## Kontrol

Console'da şunu görmelisiniz:
```
🔥 Config: {apiKey: '✅', projectId: '✅', authDomain: 'your_project.firebaseapp.com'}
```
