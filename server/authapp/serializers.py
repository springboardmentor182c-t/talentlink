from rest_framework import serializers
from apps.users.models import User


class RegisterSerializer(serializers.ModelSerializer):
    # Accept a 'role' field from the client and map it to User.user_type
    role = serializers.ChoiceField(choices=[('client', 'Client'), ('freelancer', 'Freelancer')], write_only=True)

    class Meta:
        model = User
        fields = ("email", "password", "role")
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        role = validated_data.pop('role')
        user = User.objects.create_user(
            username=validated_data["email"],
            email=validated_data["email"],
            password=validated_data["password"],
            user_type=role
        )
        return user
