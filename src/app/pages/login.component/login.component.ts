import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { LoginRequest } from '../../models/auth/login-request.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:false,
  styleUrl:'./login.component.css'
})
export class LoginComponent {
  emailOrUsername = '';
  password = '';
  rememberMe = false;
  errorMessage = '';
  successMessage = ''; // Başarı mesajı ekle
  isLoading = false; // Yükleme durumu

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // Mesajları temizle
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    const request: LoginRequest = {
      emailOrUsername: this.emailOrUsername,
      password: this.password,
      rememberMe: this.rememberMe
    };

    this.authService.login(request).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Giriş başarılı! Yönlendiriliyorsunuz...';
        
        // Token'ı kaydet
        this.authService.setToken(res.accessToken);
        
        // 1.5 saniye sonra yönlendir (kullanıcı başarı mesajını görsün)
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 1500);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login error:', err); // Debug için
        
        // Backend'den gelen hata mesajını yakala
        if (err.error?.message) {
          this.errorMessage = err.error.message;
        } else if (err.error?.errors) {
          // Validation hatalarını yakala
          this.errorMessage = Object.values(err.error.errors).flat().join(', ');
        } else if (err.message) {
          this.errorMessage = err.message;
        } else {
          this.errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.';
        }
      }
    });
  }
}