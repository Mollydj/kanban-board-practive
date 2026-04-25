import React from 'react'

export const Text = ({ children }: { children: React.ReactNode }) => <span>{children}</span>
export const Button = ({ children, onClick }: { children: React.ReactNode; onClick?: React.MouseEventHandler<HTMLButtonElement> }) => <button onClick={onClick}>{children}</button>
export const Loader = () => <div>Loading...</div>
export const Field = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const InputText = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />