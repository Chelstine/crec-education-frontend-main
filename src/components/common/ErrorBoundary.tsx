import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * Composant ErrorBoundary amélioré qui capture les erreurs dans les composants React
 * et affiche un fallback UI au lieu de planter toute l'application
 */
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Mise à jour de l'état pour afficher l'UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Capture les détails de l'erreur pour l'affichage et le debug
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log détaillé pour le développeur
    console.error('ErrorBoundary a capturé une erreur:', error);
    console.error('Détails du composant:', errorInfo.componentStack);
    
    // Si un gestionnaire d'erreur personnalisé est fourni, l'appeler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Vous pourriez ajouter ici un service de reporting d'erreurs (Sentry, LogRocket, etc.)
  }

  render() {
    if (this.state.hasError) {
      // Si un UI de fallback est fourni, l'utiliser
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // UI de fallback par défaut
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833-.23 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">
              Une erreur est survenue
            </h2>
            
            <p className="text-gray-600 text-center mb-4">
              Une erreur inattendue s'est produite. Veuillez rafraîchir la page ou contacter le support si le problème persiste.
            </p>
            
            {process.env.NODE_ENV !== 'production' && this.state.error && (
              <details className="mt-4 p-3 bg-gray-50 rounded border text-sm">
                <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                  Détails de l'erreur (Développement uniquement)
                </summary>
                <div className="space-y-2 text-xs">
                  <div>
                    <strong>Erreur:</strong>
                    <pre className="mt-1 whitespace-pre-wrap text-red-600 overflow-auto max-h-40 bg-gray-100 p-2 rounded">
                      {this.state.error.toString()}
                    </pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Stack Trace:</strong>
                      <pre className="mt-1 whitespace-pre-wrap text-gray-600 overflow-auto max-h-60 bg-gray-100 p-2 rounded">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                  {this.state.error.message.includes("Cannot convert object to primitive value") && (
                    <div className="p-2 bg-yellow-50 border border-yellow-200 rounded mt-2">
                      <p className="font-medium text-yellow-800">Conseil de débogage:</p>
                      <p className="text-yellow-700">Cette erreur se produit souvent lorsqu'un objet est utilisé comme un texte ou comme clé dans une liste. Cherchez:</p>
                      <ul className="list-disc pl-5 text-yellow-700 mt-1">
                        <li>Les composants React stockés directement dans des données (utilisez iconComponent au lieu de icon pour les composants)</li>
                        <li>Les objets utilisés comme clés React (utilisez des chaînes ou des nombres comme clés)</li>
                        <li>Les objets rendus directement dans JSX</li>
                      </ul>
                    </div>
                  )}
                </div>
              </details>
            )}
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Actualiser la page
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
