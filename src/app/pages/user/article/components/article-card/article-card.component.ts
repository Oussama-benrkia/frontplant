import { Component, Input } from '@angular/core';
import { ArticleResponse } from '../../../../../interfaces/article/article-response.interface';


@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent {
  @Input() article!: ArticleResponse;
}
