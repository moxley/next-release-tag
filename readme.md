# Generate Next Release Tag

- This is a GitHub Action that automates the process of creating the next release tag version for your repository. Note: it generates a new release version, but it does not create a new release.
- The action sets an output variable named `next_release_tag`, which can be used to create the next release.
- It uses the previous release tag and increments it based on the year, month, date, and iteration count.
- The release tag is generated in the format `yyyy.mm.dd-i`, where `yyyy` is the full year, `mm` is the month, `dd` is the date, and `i` is the iteration count.
- This action is recommended to be used with `softprops/action-gh-release` or `ncipollo/release-action` to create the release.
- The minimum supported Node.js version is v20.

## Inputs

`github_token`: The Github Secret `GITHUB_TOKEN` or `Personal Access Token`. This is a required input.

## Outputs

`next_release_tag`: This output variable contains the next release version and is set by the action. You can access it via `step.<id>.outputs.next_release_tag`.

`prev_release_tag`: Additionally, the action also sets this output variable, which contains the previous release version. You can access it via `step.<id>.outputs.prev_release_tag`.

## Example workflow

```yaml
name: Create Release

on: push

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout branch
        uses: actions/checkout@v4

      - name: Generate release tag
        id: generate_release_tag
        uses: moxley/next-release-tag@v6.0.0
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}

      - name: Create Release
        uses: softprops/action-gh-release@v2
        with:
          name: Release ${{ steps.generate_release_tag.outputs.next_release_tag }}
          tag_name: ${{ steps.generate_release_tag.outputs.next_release_tag }}
          token: ${{secrets.GITHUB_TOKEN}}
          generate_release_notes: true
```
