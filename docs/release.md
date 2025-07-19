# 🚀 Release Documentation

This document describes the release process for @a11ylint/playwright using GitHub Actions and semantic-release.

## 📋 Overview

Our release process is fully automated using **semantic-release** which determines version bumps based on conventional commits. The workflow can be triggered manually for different types of releases.

## 🏷️ Version Determination

We use [Conventional Commits](https://www.conventionalcommits.org/) to automatically determine the next version:

| Commit Type | Version Bump | Description |
|-------------|--------------|-------------|
| `fix:` | **Patch** (1.0.x) | 🐛 Bug fixes |
| `feat:` | **Minor** (1.x.0) | ✨ New features |
| `BREAKING CHANGE:` | **Major** (x.0.0) | 💥 Breaking changes |

> ⚠️ **Important**: Only commits with `feat:`, `fix:`, or containing `BREAKING CHANGE` will trigger a new release.

## 📦 NPM Distribution Channels

Releases are published to different npm channels based on the branch:

| Branch | NPM Channel | Description | Installation |
|--------|-------------|-------------|--------------|
| `main` | **latest** | 🏷️ Stable production releases | `npm install @a11ylint/playwright` |
| `alpha` | **alpha** | 🧪 Alpha pre-releases | `npm install @a11ylint/playwright@alpha` |
| `beta` | **beta** | 🧪 Beta pre-releases | `npm install @a11ylint/playwright@beta` |

> 💡 **Tip**: Users can install specific versions using `npm install @a11ylint/playwright@1.2.3` or specific channels using the `@channel` syntax.

## 🎯 Release Types

### 📦 Stable Release (Production)

For releasing a new stable version to production:

1. **Trigger the release workflow** 🚀
    - Go to GitHub Actions → Release workflow
    - Click "Run workflow"
    - Select branch: `main`
    - Configure options as needed
    - Click "Run workflow"

2. **Wait for completion** ⏳
    - The workflow will automatically determine the version
    - Create a release on GitHub
    - Publish to npm registry

### 🧪 Pre-release (Alpha/Beta)

For releasing alpha or beta versions:

#### Step 1: Create and Push Pre-release Branch 🌿
```bash
# Create alpha or beta branch from main
git checkout main
git pull origin main
git checkout -b alpha  # or 'beta'

# Push the branch to remote
git push origin alpha  # or 'beta'
```

#### Step 2: Trigger Release Workflow 🎬
- Go to GitHub Actions → Release workflow
- Click "Run workflow"
- **Select the alpha/beta branch** (not main!)
- Configure options as needed
- Click "Run workflow"

#### Step 3: Merge Back to Main 🔄
Once the release is complete and tested:

```bash
# Switch to pre-release branch and pull latest changes
git checkout alpha  # or 'beta'
git pull origin alpha  # or 'beta'

# Switch to main branch
git checkout main
git pull origin main

# Fast-forward merge the pre-release branch
git merge --ff-only alpha  # or 'beta'

# Push updated main
git push origin main

# Clean up: delete the pre-release branch
git branch -d alpha  # or 'beta'
git push origin --delete alpha  # or 'beta'
```

## ⚠️ Pre-release Branch Guidelines

- 🎯 **Single Purpose**: Alpha/beta branches should **ONLY** be used for pre-releases
- 🚫 **No Development**: Don't use these branches for ongoing development work
- 🧹 **Clean Up**: Always delete the branch after merging back to main
- ⚡ **Fast-Forward**: Use `--ff-only` merges to maintain clean history

## 🔧 Workflow Configuration

The release workflow is located at `.github/workflows/release.yaml` and includes:

- **Manual Trigger**: Can be triggered via GitHub Actions UI
- **Dry Run Mode**: Test releases without publishing
- **Debug Mode**: Enhanced logging for troubleshooting
- **Semantic Release**: Automatic versioning and changelog generation

### Available Options 🎛️

- **Dry Run** 🧪: Preview what would be released without actually publishing
- **Debug** 🔍: Enable verbose logging for troubleshooting

## 📝 Best Practices

1. **Commit Messages** ✍️
    - Use conventional commit format
    - Be descriptive and clear

2. **Pre-release Testing** 🧪
    - Always test alpha/beta releases thoroughly
    - Verify functionality in target environments
    - Check npm package contents

3. **Documentation** 📚
    - Update README if needed
    - Ensure CHANGELOG is generated correctly
    - Update any version-specific documentation

4. **Communication** 📢
    - Announce breaking changes clearly
    - Provide migration guides for major releases
    - Use GitHub releases for detailed release notes

## 🆘 Troubleshooting

### Common Issues

- **No release triggered**: Check if commits follow conventional format
- **Wrong version bump**: Verify commit message types
- **Failed publish**: Check npm permissions and package.json

### Debug Mode 🔍

Enable debug mode in the workflow to get detailed logs about:
- Semantic release analysis
- Version calculation
- Publishing steps

## 📚 Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Release](https://semantic-release.gitbook.io/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

🎉 **Happy Releasing!** Remember to follow the process carefully to ensure smooth and predictable releases.
