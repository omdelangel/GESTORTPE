import { NavItem } from './nav-item';

export let menu: NavItem[] = [
  {
    displayName: 'Inicio',
    iconName: 'home',
    route: 'inicio'
  },
  {
    displayName: 'Catálogos',
    iconName: 'list',
    route: '',
    children: [
      {
        displayName: 'Usuarios',
        iconName: '',
        route: 'usuarios'
      },
      {
        displayName: 'Estaciones de Gas',
        iconName: '',
        route: 'estaciones'
      },
      {
        displayName: 'Sindicatos',
        iconName: '',
        route: 'sindicatos'
      }
    ]
  }
];