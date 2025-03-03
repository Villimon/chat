import React, { ErrorInfo, ReactNode } from 'react'
import { ErrorComponent } from '../ui/ErrorComponent'

interface ErrorBoundaryState {
    hasError: boolean
}

interface ErrorBoundaryProps {
    children: ReactNode
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.log(error, info)
    }

    render() {
        if (this.state.hasError) {
            return <ErrorComponent />
        }

        return this.props.children
    }
}
