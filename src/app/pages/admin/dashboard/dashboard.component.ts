import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  count?: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { label: 'Articles', icon: 'article', route: '/admin/articles', count: 0 },
    { label: 'Plants', icon: 'local_florist', route: '/admin/plants', count: 0 },
    { label: 'Diseases', icon: 'coronavirus', route: '/admin/diseases', count: 0 },
    { label: 'Users', icon: 'people', route: '/admin/users', count: 0 },
  ];

  stats = {
    totalUsers: 0,
    totalArticles: 0,
    totalPlants: 0,
    totalDiseases: 0
  };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.dataService.getDashboardData().subscribe({
      next: (data) => {
        this.stats = {
          totalUsers: data.user,
          totalArticles: data.article,
          totalPlants: data.plante,
          totalDiseases: data.maladie
        };

        // Update menu item counts
        this.updateMenuItemCounts(data);
      },
      error: (error) => {
        console.error('Error fetching dashboard data:', error);
      }
    });
  }

  private updateMenuItemCounts(data: any) {
    this.menuItems = this.menuItems.map(item => {
      switch (item.label) {
        case 'Articles':
          return { ...item, count: data.article };
        case 'Plants':
          return { ...item, count: data.plante };
        case 'Diseases':
          return { ...item, count: data.maladie };
        case 'Users':
          return { ...item, count: data.user };
        default:
          return item;
      }
    });
  }
}
