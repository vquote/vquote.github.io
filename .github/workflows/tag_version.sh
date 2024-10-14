REMOTE_ORIGIN="https://${GITHUB_REPOSITORY_OWNER}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
git remote set-url origin $REMOTE_ORIGIN;
git pull origin --tags;

YYMM=$(date +%y.%m)
TAG_COUNT=$(git tag -l | wc -l)
TAG="v${YYMM}.${TAG_COUNT}"
echo "NEW TAG: $TAG"

git tag $TAG;
git push origin --tags;



