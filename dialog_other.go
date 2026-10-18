//go:build !windows

package main

import "fmt"

func pickFolderDialog(initialDir string) (string, error) {
	return "", fmt.Errorf("dialog not supported on this platform")
}
