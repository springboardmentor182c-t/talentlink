from django.http import HttpResponse

def placeholder(request):
	return HttpResponse("Users app root. Placeholder view.")
