import {
  Dashboard as DashboardIcon,
  Assignment as EnquiryIcon,
  Assessment as ReportsIcon,
  ShoppingCart as OrdersIcon,
  Report as ComplaintsIcon,
  Inventory as InventoryIcon,
  SupervisorAccount as MastersIcon,
  People as UserManagementIcon,
  Payment as PaymentsIcon,
} from '@mui/icons-material';
import React from 'react';

export interface MenuItem {
  text: string;
  icon: React.ReactNode;
}

export const menuItems: MenuItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: '18px' }} /> },
  { text: 'Enquiry', icon: <EnquiryIcon sx={{ fontSize: '18px' }} /> },
  { text: 'Reports', icon: <ReportsIcon sx={{ fontSize: '18px' }} /> },
  { text: 'Orders', icon: <OrdersIcon sx={{ fontSize: '18px' }} /> },
  { text: 'Complaints', icon: <ComplaintsIcon sx={{ fontSize: '18px' }} /> },
  { text: 'Inventory', icon: <InventoryIcon sx={{ fontSize: '18px' }} /> },
  { text: 'Masters', icon: <MastersIcon sx={{ fontSize: '18px' }} /> },
  { text: 'User Management', icon: <UserManagementIcon sx={{ fontSize: '18px' }} /> },
  { text: 'Payments', icon: <PaymentsIcon sx={{ fontSize: '18px' }} /> },
]; 