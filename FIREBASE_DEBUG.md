# Firebase Debug Rehberi

## Skills Koleksiyonuna Veri Eklenmiyor

### Kontrol Listesi

1. **Firestore Security Rules Kontrolü**
   - Firebase Console → Firestore Database → Rules
   - Geliştirme için test mode olmalı:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true; // Test mode - sadece geliştirme için!
       }
     }
   }
   ```

2. **Console'da Hata Kontrolü**
   - Tarayıcı Console'unu açın (F12)
   - Test sayfasında "Örnek Skills Ekle" butonuna tıklayın
   - Console'da şu mesajları kontrol edin:
     - `🚀 createSampleSkills: Başlıyor...`
     - `✅ Firestore bulundu`
     - `✅ [Skill adı] başarıyla eklendi`
     - Veya hata mesajları

3. **Firebase Console'da Kontrol**
   - Firebase Console → Firestore Database
   - `skills` koleksiyonu var mı?
   - Koleksiyon boş mu?

### Manuel Ekleme (Firebase Console'dan)

1. Firebase Console'a gidin
2. Firestore Database → "Start collection"
3. Collection ID: `skills`
4. İlk dokümanı ekleyin:
   ```json
   {
     "skill_name": "JavaScript",
     "field": ["front_end", "back_end"],
     "skill_logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
     "order": 1
   }
   ```

### Test Sayfası Kullanımı

1. `http://localhost:4000/test-firebase` adresine gidin
2. "Test Firebase Connection" butonuna tıklayın (bağlantıyı test eder)
3. "Örnek Skills Ekle (Test)" butonuna tıklayın
4. Console'da hata mesajlarını kontrol edin

### Yaygın Hatalar

1. **Permission Denied**
   - Firestore Rules'ı kontrol edin
   - Test mode aktif mi?

2. **Firestore not initialized**
   - `.env` dosyasını kontrol edin
   - Dev sunucusunu yeniden başlatın

3. **Collection doesn't exist**
   - İlk doküman eklendiğinde otomatik oluşur
   - Manuel olarak oluşturmanıza gerek yok
