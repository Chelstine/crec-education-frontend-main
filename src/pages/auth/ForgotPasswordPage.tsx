import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import authService from '@/services/auth-service';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation email
    if (!email.trim()) {
      setError('L\'adresse email est obligatoire');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Veuillez saisir une adresse email valide');
      setIsLoading(false);
      return;
    }

    try {
      await authService.forgotPassword(email);
      setIsSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
          {/* Header Success */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Email envoyé !
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Si cette adresse email est associée à un compte administrateur, 
              vous recevrez un email avec un nouveau mot de passe temporaire.
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Prochaines étapes
            </h3>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Vérifiez votre boîte email</li>
              <li>2. Utilisez le mot de passe temporaire pour vous connecter</li>
              <li>3. Changez immédiatement votre mot de passe</li>
            </ol>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link to="/admin/login">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                Retour à la connexion
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsSuccess(false);
                setEmail('');
              }}
            >
              Envoyer à une autre adresse
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Mot de passe oublié ?
          </h1>
          <p className="text-gray-600 text-sm">
            Saisissez votre adresse email pour recevoir un nouveau mot de passe temporaire.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Adresse email</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@crec-education.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-10 ${error ? "border-red-500" : ""}`}
                disabled={isLoading}
                autoFocus
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
          </div>

          {/* Security Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start">
              <Shield className="w-4 h-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-xs text-amber-800">
                <p className="font-medium mb-1">Sécurité :</p>
                <p>
                  Pour des raisons de sécurité, nous ne révélons pas si une adresse email 
                  est associée à un compte. Si votre email est valide, vous recevrez 
                  les instructions de réinitialisation.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Envoi en cours...
              </div>
            ) : (
              'Envoyer le nouveau mot de passe'
            )}
          </Button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <Link
            to="/admin/login"
            className="inline-flex items-center text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
