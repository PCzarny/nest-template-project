# Deployment

## Google Cloud Platform

### Prerequirements

1. GCP Project
2. Service Account with JSON key generated and permisions (`roles/run.developer`, `roles/iam.serviceAccountUser` and `roles/artifactregistry.writer`)

```
gcloud iam service-accounts create gh-actions \
  --display-name="GH Actions Service Account"
```

3. Google Secret Manager (Secret Manager API enabled)

Add required secrets - based on .env file

4. OPTIONAL: Service Account for Cloud Run with permission `roles/secretmanager.secretAccessor`

```
gcloud iam service-accounts create cloud-run-sa \
  --display-name="Cloud Run Service Account"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:cloud-run-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

# Or for each secret individualy

gcloud secrets add-iam-policy-binding DATABASE_URL \
  --member="serviceAccount:cloud-run-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding JWT_SECRET \
  --member="serviceAccount:cloud-run-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding MONGO_URI \
  --member="serviceAccount:cloud-run-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

instead of it you can add role to compute engine service account

```
# For all secrets
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:<id>-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

# Or for each secret individualy

gcloud secrets add-iam-policy-binding DATABASE_URL \
  --member="serviceAccount:<id>-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding JWT_SECRET \
  --member="serviceAccount:<id>-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding MONGO_URI \
  --member="serviceAccount:<id>-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

5. Cloud Run (Cloud Run Admin API enabled)
6. Artifact Registry - image repository (Artifact Registry API enabled)
