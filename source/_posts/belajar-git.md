---
title: Belajar Git Github
copyright: true
author: 
  name: Bai Rahmat
  link: https://github.com/sameknet
tags:
- git
---

#### Panduan Penggunaan Git
- Install Git di Ubuntu
```
apt-get update
apt-get install git git-core

```
- Lakukan inisialisasi dengan mengetikkan perintah berikut: 
```bash
git init
```
Perintah tersebut akan membuat sebuah repository lokal untuk project kita

- Langkah berikutnya adalah memasukkan file-file source code serta folder kedalam staging area, yaitu suatu kondisi dimana file serta folder source code dimasukkan ke dalam repository namun dalam keadaan temporary, belum disimpan. Untuk menyimpannya gunakan perintah berikut :
```
git add *
```
Perintah tersebut akan memasukkan seluruh file dan folder yang ada pada folder Project kita. Jika ingin memasukkan satu persatu cukup tuliskan nama file lengkap dengan ekstensinya atau nama folder jika hanya ingin menambahkan satu folder :
```
git add "nama file" atau,
git add "nama folder"
```
- Setelah itu kita siap untuk menyimpan source code kita kedalam repository. Ketikkan perintah berikut :
```
git commit -m "My Commit"
```
Perintah diatas akan menyimpan source code kita sekaligus memberikan catatan supaya mudah kita ingat.

- Selanjutnya kita login ke Github.com untuk membuat sebuah repository baru dengan mengeklik tombol yang terletak pada kanan atas ( New Repository ). Perhatikan gambar berikut :
{% asset_img buat-repo.png %}

Buat repository dengan nama “My-blog” misalnya 
{% asset_img buat-repo-blog.png %}
centang untuk "Initialize this repository with a README" setelah itu klik tombol “Create repository”.

Sekarang kita bisa mengakses remote repository dengan url https://github.com/sameknet/My_blog.git misalnya. Tambahkan remote repository yang barusan kita buat supaya proyek kita bisa diupload. Berikut perintahnya :
```
git remote add origin https://github.com/sameknet/My_blog.git
```
Selanjutnya kita download terlebih dahulu file readme yang ada secara default ketika kita membuat repository di github dengan mengetikkan perintah :
```
git pull origin master
```
Terakhir adalah mengupload ke Github dengan perintah :
```
git push origin master
```
masukkan username serta password github jika diminta.

cek di github, maka file dan folder kita sudah ada di repo github
{% asset_img repo-baru.png %}

#### Tambah & Komit
Kita bisa melakukan perubahan (penambahan ke Indeks) menggunakan :
```
git add <namaberkas> atau,
git add *
```
Ini merupakan langkah awal alur-kerja dasar git. Untuk komit sepenuhnya gunakan :
```
git commit -m "Pesan komit"
```
Sekarang berkas telah terkomit di HEAD, tapi belum di repositori ke github, untuk mengirimkannya ke repositori github, kita gunakan perintah berikut :
```
git push origin master
```
Ubah "master" sesuai branch yang kita inginkan

#### Membuat Branch di Github
Dalam pengembangan suatu project, akan banyak sekali fitur-fitur yang akan diimplementasikan. Dan fitur-fitur tersebut mungkin bisa dikerjaan secara bersamaan (parallel). Dan disitulah pembuatan branch diperlukan.

Misalnya branch yang satu fokus untuk mengembangkan fitur keamanan, sedangkan branch lainnya fokus untuk pengembangan tampilan. Idealnya pengembangan sebuah fitur tidak mempengaruhi fitur yang lain atau malah mempengaruhi code yang sudah stabil. Disinilah git bisa membantu kita.

Cara membuat branch dengan perintah :
```
git branch nama_branch
```
Dari awal selama ini kita sebenarnya beroperasi di cabang master. Ini adalah cabang default atau standar dari git. Dan ketika kita membuat branch dengan command git tersebut diatas, kita tidak otomatis pindah ke branch. Kemungkinan kita masih di master. Untuk pindah, gunakan perintah :
```
git checkout nama_branch
```
Setelah kita checkout ke branch, kita bisa melakukan apa saja di file dan di directory branch, branch yang lain (termasuk master) tidak akan terpengaruhi.

