import {
  Dashboard as DashboardIcon,
  Assignment as EnquiryIcon,
  Assessment as ReportsIcon,
  ShoppingCart as OrdersIcon,
  Report as ComplaintsIcon,
  Inventory as InventoryIcon,
  SupervisorAccount as MastersIcon,
  // People as UserManagementIcon,
  Payment as PaymentsIcon,
  Category as ProductIcon,
  Person as ClientIcon,
  Group as UserMasterIcon,
  LocalShipping as SupplierIcon,
} from '@mui/icons-material';
import React from 'react';

export interface SubMenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

export interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  subItems?: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon sx={{ fontSize: '18px' }} /> },
  { text: 'Enquiry', path: '/enquiry', icon: <EnquiryIcon sx={{ fontSize: '18px' }} /> },
  { text: 'Reports', path: '/reports', icon: <ReportsIcon sx={{ fontSize: '18px' }} /> },
  { text: 'Orders', path: '/orders', icon: <OrdersIcon sx={{ fontSize: '18px' }} /> },
  { text: 'Complaints', path: '/complaints', icon: <ComplaintsIcon sx={{ fontSize: '18px' }} /> },
  { text: 'Inventory', path: '/inventory', icon: <InventoryIcon sx={{ fontSize: '18px' }} /> },
  { 
    text: 'Masters', 
    path: '/masters', 
    icon: <MastersIcon sx={{ fontSize: '18px' }} />,
    subItems: [
      { text: 'Product', path: '/masters/product', icon: <ProductIcon sx={{ fontSize: '18px' }} /> },
      { text: 'Client', path: '/masters/client', icon: <ClientIcon sx={{ fontSize: '18px' }} /> },
      { text: 'User Master', path: '/masters/user-master', icon: <UserMasterIcon sx={{ fontSize: '18px' }} /> },
      { text: 'Supplier', path: '/masters/supplier', icon: <SupplierIcon sx={{ fontSize: '18px' }} /> },
    ]
  },
  // { text: 'User Management', path: '/users', icon: <UserManagementIcon sx={{ fontSize: '18px' }} /> },
  { text: 'Payments', path: '/payments', icon: <PaymentsIcon sx={{ fontSize: '18px' }} /> },
]; 