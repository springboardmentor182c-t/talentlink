import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

def create_mock_users():
    freelancers = []
    clients = []
    
    print("Creating mock users...")
    
    # Create 5 Freelancers
    for i in range(1, 6):
        email = f'freelancer{i}@example.com'
        password = 'Password123!'
        # Determine unique first/last names if needed, but not specified in prompt.
        # User model seems to be just email/password/role mostly based on settings.
        
        try:
            user, created = User.objects.get_or_create(email=email)
            if created:
                user.set_password(password)
                user.role = 'freelancer'
                user.is_verified = True
                user.save()
                freelancers.append((email, password))
            else:
                freelancers.append((email, "User already exists (password unchanged)"))
        except Exception as e:
            freelancers.append((email, f"Error: {e}"))
            
    # Create 5 Clients
    for i in range(1, 6):
        email = f'client{i}@example.com'
        password = 'Password123!'
        
        try:
            user, created = User.objects.get_or_create(email=email)
            if created:
                user.set_password(password)
                user.role = 'client'
                user.is_verified = True
                user.save()
                clients.append((email, password))
            else:
                clients.append((email, "User already exists (password unchanged)"))
        except Exception as e:
            clients.append((email, f"Error: {e}"))

    print("\nFreelancers:")
    print("-" * 30)
    for email, pwd in freelancers:
        print(f"Email: {email:<25} | Password: {pwd}")
        
    print("\nClients:")
    print("-" * 30)
    for email, pwd in clients:
        print(f"Email: {email:<25} | Password: {pwd}")

if __name__ == '__main__':
    create_mock_users()
