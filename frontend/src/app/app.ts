import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

interface ChatMessage {
  id: number;
  text: string;
  files: string[];
  createdAt: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, ButtonModule, CardModule, InputTextModule, TextareaModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = 'AI Assistant Finance';
  protected readonly isAuthenticated = signal(false);
  protected readonly isMenuOpen = signal(true);
  protected readonly currentUser = signal('');
  protected readonly messages = signal<ChatMessage[]>([]);
  protected readonly pendingFiles = signal<File[]>([]);
  protected readonly isDropzoneActive = signal(false);

  protected loginName = '';
  protected draftMessage = '';
  private nextMessageId = 1;

  protected login(): void {
    const name = this.loginName.trim();

    if (!name) {
      return;
    }

    this.currentUser.set(name);
    this.isAuthenticated.set(true);
  }

  protected logout(): void {
    this.isAuthenticated.set(false);
    this.currentUser.set('');
    this.loginName = '';
    this.draftMessage = '';
    this.pendingFiles.set([]);
    this.messages.set([]);
    this.isDropzoneActive.set(false);
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected sendMessage(event?: Event): void {
    event?.preventDefault();

    const text = this.draftMessage.trim();
    const files = this.pendingFiles().map((file) => file.name);

    if (!text && files.length === 0) {
      return;
    }

    const message: ChatMessage = {
      id: this.nextMessageId++,
      text,
      files,
      createdAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    this.messages.update((items) => [...items, message]);
    this.draftMessage = '';
    this.pendingFiles.set([]);
  }

  protected onFileInputChange(input: HTMLInputElement): void {
    this.appendFiles(input.files);
    input.value = '';
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDropzoneActive.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDropzoneActive.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDropzoneActive.set(false);
    this.appendFiles(event.dataTransfer?.files ?? null);
  }

  protected removePendingFile(index: number): void {
    this.pendingFiles.update((files) => files.filter((_, fileIndex) => fileIndex !== index));
  }

  private appendFiles(fileList: FileList | null): void {
    if (!fileList || fileList.length === 0) {
      return;
    }

    const existing = new Set(
      this.pendingFiles().map((file) => `${file.name}:${file.size}:${file.lastModified}`)
    );

    const next = [...this.pendingFiles()];

    for (const file of Array.from(fileList)) {
      const key = `${file.name}:${file.size}:${file.lastModified}`;

      if (!existing.has(key)) {
        next.push(file);
        existing.add(key);
      }
    }

    this.pendingFiles.set(next);
  }
}
