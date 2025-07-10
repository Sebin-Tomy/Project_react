"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@example.com" && password === "password") {
          const userData = {
            id: 1,
            email: email,
            name: "Admin User",
            role: "admin",
          }
          setUser(userData)
          localStorage.setItem("user", JSON.stringify(userData))
          resolve(userData)
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const resetPassword = async (email) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: "Password reset email sent" })
      }, 1000)
    })
  }

  const value = {
    user,
    login,
    logout,
    resetPassword,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
