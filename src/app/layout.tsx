import type { Metadata, Viewport } from 'next';
import './globals.css';
import {RegisterSW} from '@/components/register-sw';
export const metadata: Metadata={title:'LIFE OS',description:'A calm home for your day',applicationName:'LIFE OS',manifest:'/manifest.webmanifest'};
export const viewport: Viewport={themeColor:'#f7f8fa',viewportFit:'cover'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="th"><body><RegisterSW/>{children}</body></html>}
