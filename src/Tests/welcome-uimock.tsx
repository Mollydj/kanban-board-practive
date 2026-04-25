// src/Tests/__mocks__/welcome-ui.tsx
import React from 'react'

export const Text = ({ children }: any) => <span>{children}</span>
export const Button = ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>
export const Loader = () => <div>Loading...</div>
export const Field = ({ children }: any) => <div>{children}</div>
export const InputText = (props: any) => <input {...props} />