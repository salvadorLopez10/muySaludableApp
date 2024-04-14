import { create } from 'zustand';
import { MuySaludableApi } from '../../api/MuySaludableApi';

type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

interface User{
    id:               number;
    nombre:           null | string;
    email:            null | string;
    password:         null | string;
    edad:             null | string;
    altura:           null | string;
    peso:             null | string;
    sexo:             null | string;
    actividad_fisica: null | string;
    tipo_dieta:       null | string;
    alimentos_evitar: null | string;
    objetivo:         null | string;
    estado_mexico:    null | string;
    activo:           boolean;
    createdAt:        Date;
    updatedAt:        Date;
    id_plan_alimenticio: number;
    nombre_plan: null | string;
    tmb: null | string;
    duracion_meses: null | string;
}

interface AuthResponse{
    status: string;
    msg: string;
    data: User;
}

export interface AuthState {
    status: AuthStatus,
    user?: User;
}

export const useAuthStore = create<AuthState>()( (set,get) =>({
    status: 'checking',
    user: undefined,

}) )

